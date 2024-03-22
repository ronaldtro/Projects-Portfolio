import connectDb from "@/app/lib/mongodb";
import projectsData from "../../../helps/projectsData.json";
import { NextResponse } from "next/server";
import fs from 'fs';

export async function POST(request: any) {
    try {
        //await connectDb();
        const req = await request.json();
        console.log(req);

        fs.writeFile('./src/app/helps/projectsData.json', JSON.stringify(req, null, 2), (err) => {
            if (err) {
              console.error('Error al guardar los cambios en el archivo JSON:', err);
              return;
            }
            console.log('Cambios guardados correctamente.');
          });
        console.log(request);

        return NextResponse.json({
            res: "Escritura exitosa",
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            msg: "Error de servidor: "+error,
            status: 500
        })
    }

}