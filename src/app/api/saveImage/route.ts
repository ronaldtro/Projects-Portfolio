import connectDb from "@/app/lib/mongodb";
import imageSave from "@/app/mongoModels/imageSave";
import { NextRequest, NextResponse } from "next/server";
const util = require('util');

export async function POST(request: NextRequest){
    try{
        const fd = await request.formData();
        const image:any  = fd.get("imagen");
        //console.log(fd);

        await connectDb();
        const buffer = Buffer.from(await image.arrayBuffer());
        //console.log(buffer);

        
        const resp = await imageSave.create({
            image: buffer,
            imageId: Date.now()+"",
            type: image.type
        });

        //console.log(resp);
        return NextResponse.json({
            msg: resp,
            status: 200
        });
    }catch(error){
        console.log(error);
        return NextResponse.json({
            msg: `Error de servidor`,
            status: 500
        });
    }
}

export async function GET(){
    try{

        await connectDb();
        const resp = await imageSave.findOne({imageId: "1710563800884"}).exec();
        //console.log("Respuesta servidor: ");
        console.log(resp);

        

        return NextResponse.json({
            msg: resp,
            status: 200
        });
    }catch(error){
        //console.log("ERRORRRRRR");
        console.log(error);
        return NextResponse.json({
            msg: "Error de servidor",
            status: 500
        });
    }
}