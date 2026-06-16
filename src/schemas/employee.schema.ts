import { z } from "zod";
import { OCCUPATIONS, DEPARTMENTS } from "@/types/employee";

const isoDateString = z
  .string()
  .refine((val) => !Number.isNaN(Date.parse(val)), {
    message: "Must be a valid date",
  });

export const employeeSchema = z
  .object({
    code: z
      .string()
      .min(1, "Code is required")
      .regex(
        /^[A-Za-z0-9_-]+$/,
        "Code can only contain letters, numbers, hyphens and underscores",
      ),
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    occupation: z.enum(OCCUPATIONS, { message: "Select a valid occupation" }),
    department: z.enum(DEPARTMENTS, { message: "Select a valid department" }),
    dateOfEmployment: isoDateString,
    terminationDate: z.union([isoDateString, z.literal("")]).nullable(),
  })
  .refine(
    (data) => {
      if (!data.terminationDate) return true;
      return new Date(data.terminationDate) >= new Date(data.dateOfEmployment);
    },
    {
      message: "Termination date cannot be before employment date",
      path: ["terminationDate"],
    },
  );

export type EmployeeFormValues = z.infer<typeof employeeSchema>;
