import { z } from "zod";

export const createReportSchema = z.object({
    name: z.string().min(3, "Nombre debe tener al menos 3 caracteres").max(20, "Nombre debe tener máximo 20 caracteres"),
    location: z.string().min(3, "Ubicación debe tener al menos 3 caracteres").max(80, "Ubicación debe tener máximo 80 caracteres"),
    recolectionService: z.boolean().optional(),
    recolectionSchedule: z.string().min(1, "Horario de la recolección es obligatorio"),
    companySchedule: z.string().min(1, "Horario de la compañía es obligatorio"),
    lat: z.string().transform((val) => parseFloat(val)).refine((val) => !isNaN(val) && val >= -90 && val <= 90, {
        message: "La Latitud debe estar entre -90 y 90",
    }),
    lng: z.string().transform((val) => parseFloat(val)).refine((val) => !isNaN(val) && val >= -180 && val <= 180, {
        message: "La Longitud debe estar entre -180 y 180",
    }),
    textileTypeIds: z.array(z.string()).min(1, 'Debes seleccionar al menos un tipo de textil'),
    ownerIds: z.array(z.string()).optional(),
});
