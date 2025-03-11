import {
  AnyZodObject,
  ZodBoolean,
  ZodLiteral,
  ZodNumber,
  ZodOptional,
  ZodString,
  z,
} from "zod";

export type SSingleValueSchema =
  | ZodString
  | ZodBoolean
  | ZodNumber
  | ZodLiteral<boolean>
  | ZodOptional<ZodString>;

// todo: definiera upp fel, ev passa upp till huvudformen
export const SingleSchemas: { [k: string]: SSingleValueSchema } = {
  privacyPolicy: z.literal<boolean>(true),
  serviceTerms: z.literal<boolean>(true),
  company: z.string().max(100).optional(), // Company is left optional for now.
  name: z.string().nonempty().max(100), // Company is left optional for now.
  phoneNumber: z.string().max(20).optional(),
  email: z.string().email(),
  password: z.string().min(8),
  onlyRequired: z.string().min(1),
  verificationCode: z.number().min(6).max(6),
  message: z.string().max(500),
};

export const SLoginFormSchema: AnyZodObject = z.object({
  username: SingleSchemas.onlyRequired,
  password: SingleSchemas.onlyRequired,
});

type TLoginFormSchema = z.infer<typeof SLoginFormSchema>;

export const SRegistrationFormSchema: AnyZodObject = z.object({
  email: SingleSchemas.email,
  password: SingleSchemas.password,
  company: SingleSchemas.company,
  verificationCode: SingleSchemas.onlyRequired, // might not be a good idea to tell a potential scammer to code format, so onlyRequired, for now.
  privacyPolicy: SingleSchemas.privacyPolicy,
  serviceTerms: SingleSchemas.serviceTerms,
});

type TRegistrationFormSchema = z.infer<typeof SRegistrationFormSchema>;

export const SContactFormSchema: AnyZodObject = z.object({
  name: SingleSchemas.name,
  email: SingleSchemas.email,
  phoneNumber: SingleSchemas.phoneNumber,
  message: SingleSchemas.message,
});

type TContactFormSchema = z.infer<typeof SContactFormSchema>;

export type TFormSchema =
  | TLoginFormSchema
  | TRegistrationFormSchema
  | TContactFormSchema;

export type TErrorObject = { [k: string]: string | undefined };
