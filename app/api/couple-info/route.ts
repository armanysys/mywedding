import { NextResponse } from "next/server";
import { coupleInfo } from "../../../MockData/couple-info-data";

/**
 * GET /api/couple-info
 *
 * Returns couple information section data for the wedding website
 *
 * @returns {Couple} Couple information
 *
 * Response Schema:
 * {
 *   GroomName: string,
 *   BrideName: string,
 *   CoupleHistory?: string,
 *   GroomFamily: { FaherName?: string, MotherName?: string, FamilyHistory?: string },
 *   BrideFamily: { FaherName?: string, MotherName?: string, FamilyHistory?: string }
 * }
 */
export async function GET() {
    try {
        return NextResponse.json(coupleInfo, {
            status: 200,
            headers: {
                "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
            },
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch couple info data" }, { status: 500 });
    }
}
