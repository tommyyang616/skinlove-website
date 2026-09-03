import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const TENANT_SLUG = process.env.NEXT_PUBLIC_TENANT_SLUG || "skinlove";

/**
 * Wartungsschalter aus Upstash.
 *
 * Das Master-Dashboard setzt `maintenance:<slug>`; hier wird er gelesen.
 * Der Schlüsselname muss mit `maintenanceKey()` im Dashboard übereinstimmen —
 * weicht er ab, fällt die Seite still auf "kein Wartungsmodus" zurück.
 *
 * Die Next-Doku warnt ausdrücklich davor, im Proxy langsam Daten zu holen, und
 * fetch-Caching wirkt hier nicht. Deshalb ein eigener Zwischenspeicher auf
 * Modulebene: pro laufender Instanz höchstens alle 30 Sekunden ein Abruf.
 * Preis dafür ist, dass ein Umschalten bis zu 30 Sekunden braucht.
 */
const CACHE_MS = 30_000;
let zwischenstand: { wert: boolean; bis: number } | null = null;

async function istWartung(): Promise<boolean> {
    if (zwischenstand && zwischenstand.bis > Date.now()) {
        return zwischenstand.wert;
    }

    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;

    // Ohne Zugangsdaten bleibt die Seite erreichbar. Ein Konfigurationsfehler
    // darf keine funktionierende Seite abschalten.
    if (!url || !token) return false;

    try {
        const res = await fetch(`${url}/get/maintenance:${TENANT_SLUG}`, {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
            signal: AbortSignal.timeout(2000),
        });

        if (!res.ok) return zwischenstand?.wert ?? false;

        const daten = await res.json();
        const wert = daten.result === "true" || daten.result === true;
        zwischenstand = { wert, bis: Date.now() + CACHE_MS };
        return wert;
    } catch {
        // Bei Zeitüberschreitung oder Netzfehler den letzten bekannten Stand
        // behalten, sonst durchlassen — nie wegen einer Störung sperren.
        return zwischenstand?.wert ?? false;
    }
}

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.includes(".") ||
        pathname === "/maintenance" ||
        pathname === "/admin"
    ) {
        return NextResponse.next();
    }

    // Notbremse: Steht MAINTENANCE_MODE auf "true", gilt das unabhängig vom
    // Dashboard. So bleibt die Seite auch dann abschaltbar, wenn Upstash streikt.
    const erzwungen = process.env.MAINTENANCE_MODE === "true";

    if (erzwungen || (await istWartung())) {
        const url = request.nextUrl.clone();
        url.pathname = "/maintenance";
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
