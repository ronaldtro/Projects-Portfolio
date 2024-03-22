import connectDb from "@/app/lib/mongodb";
import project from "@/app/mongoModels/project";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDb();
        const resp = await project.countDocuments({});
        console.log(resp);
        return NextResponse.json({
            msg: resp,
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            msg: "Error de servidor: "+error,
            status: 500
        })
    }

}