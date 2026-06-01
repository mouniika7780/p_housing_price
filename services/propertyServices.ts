import { PropertyInput, PropertyOutput } from "@/types/property";
import AxiosInstance from "@/lib/axios";



export const propertyServices = {
    predictPrice : async (input: PropertyInput): Promise<PropertyOutput> => {
        const response = await AxiosInstance.post<PropertyOutput>("/predict", input);
        return response.data;
    },

    checkHealth: async (): Promise<boolean> => {
        try {
            await AxiosInstance.get("/health");
            return true;
        } catch {
            return false;
        }
    },
}