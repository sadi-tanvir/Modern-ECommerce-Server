
export const checkAdminService = (role: string) => {
    if (role == undefined) throw new Error("You are not authorized to view this page");
    if (role !== 'admin') throw new Error("You are not authorized to view this page");
} 