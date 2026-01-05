import { UserRole } from "@/lib/auth-utils";
import { IAdmin } from "./admin.interface";
import { IUser } from "./patient.interface";

export interface UserInfo {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    needPasswordChange: boolean;
    status: "ACTIVE" | "BLOCKED" | "DELETED";
    admin?: IAdmin;
    user?: IUser;
    createdAt: string;
    updatedAt: string;
}