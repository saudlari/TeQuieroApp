import { NextResponse } from "next/server";
import clientPromise from '../../../lib/mongodb';

export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db("tequieroapp");

        const data = await request.json(); // Parsing the JSON body from the request

        if (!data ) {
            // Here we directly return a response with status 400
            return new NextResponse(JSON.stringify({ message: 'No image data provided' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }


        // Validate and process each photo data
        if (!data.image || !data.userTo || !data.userFrom) {
            throw new Error('Invalid photo data');
        }


        const collection = db.collection("photostequiero");
        const result = await collection.insertOne(data);

        // Here we directly return a response with status 201 and the result as JSON
        return NextResponse.json(result);

    } catch (error) {
        // Here we directly return a response with status 500
        return new NextResponse(JSON.stringify({ message: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}