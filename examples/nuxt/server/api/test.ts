import { createApiClient } from "@image-sass/api";
import jwt from "jsonwebtoken";

const apiKey = "1b2b7115-8bec-4c32-95c4-947f5774e3e6";
const clientId = "24671a84-68f2-44b2-b432-6f39c5e4fef5";

export default defineEventHandler(async (event) => {
    // console.log(apiClient);

    const token = jwt.sign(
        {
            filename: "Screenshot 2023-06-20 200151.png",
            contentType: "image/png",
            size: 34105,
            appId: "c52963e1-dfa2-4e70-8333-04de2dcbbb4b",
            clientId,
        },
        apiKey,
        {
            expiresIn: "10m",
        }
    );

    return token;

    // const apiClient = createApiClient({ apiKey });

    // const response = await apiClient.file.createPresignedUrl.mutate({
    //     filename: "Screenshot 2023-06-20 200151.png",
    //     contentType: "image/png",
    //     size: 34105,
    //     appId: "c52963e1-dfa2-4e70-8333-04de2dcbbb4b",
    // });

    // return response;
});
