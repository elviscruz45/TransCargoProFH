// import { adminAuthClient } from "@/utils/supabase/admin";
// // import { ResponseEndpoint } from "../types/Response/response.interface";
// import { ResponseEndpoint } from "@/utils/types/Response/response.interface";
// import { supabase } from "@/utils/supabase/client1";

// export const auth = {
//   loginWithPassword: async (
//     email: string,
//     password: string
//   ): Promise<ResponseEndpoint> => {
//     try {
//       const { data, error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       });
//       if (error) throw error;
//       return {
//         success: true,
//         messages: "User login found",
//         code: 200,
//         data: data,
//       };
//     } catch (error: any) {
//       return {
//         success: false,
//         messages: error.messages,
//         code: 400,
//         data: {},
//       };
//     }
//   },
//   validateEmailRol: async (email: string): Promise<ResponseEndpoint> => {
//     try {
//       const { data, error } = await supabase
//         .from("users")
//         .select("*, rol(*),insurer_id(*)")
//         .eq("email", email);
//       if (error) throw error;
//       return {
//         success: true,
//         code: 200,
//         data: data[0],
//         messages: "",
//       };
//     } catch (error: any) {
//       return {
//         success: false,
//         code: 400,
//         data: [],
//         messages: error.message,
//       };
//     }
//   },

//   getUser: async () => {
//     const { data }: { data: any } = await supabase.auth.getUser();
//     const { user } = data;
//     return user;
//   },

//   updateUser: async (id: string, newEmail: string) => {
//     const { data: user, error } =
//       await adminAuthClient.auth.admin.updateUserById(id, {
//         email: newEmail,
//       });
//     if (error) {
//       console.error(error);
//       return null;
//     }
//     return user;
//   },

//   signOut: async () => {
//     localStorage.removeItem("auth");
//     await supabase.auth.signOut();
//   },

//   createUser: async (
//     email: string,
//     password: string,
//     metadata?: any
//   ): Promise<ResponseEndpoint> => {
//     try {
//       if (metadata) {
//         const { data, error } = await supabase.auth.signUp({
//           email: email,
//           password: password,
//           options: { data: metadata },
//         });

//         if (error) throw error;
//         return {
//           code: 200,
//           data: data,
//           success: true,
//         };
//       }
//       const { data, error } = await supabase.auth.signUp({
//         email: email,
//         password: password,
//       });

//       if (error) throw error;
//       return {
//         code: 200,
//         data: data,
//         success: true,
//       };
//     } catch (error: any) {
//       return {
//         code: error.status,
//         data: error,
//         success: false,
//         messages: error.message,
//       };
//     }
//   },
//   createUserwithAdmin: async (
//     email: string,
//     password: string,
//     metadata?: any
//   ): Promise<ResponseEndpoint> => {
//     try {
//       if (metadata) {
//         const { data, error } = await adminAuthClient.auth.admin.createUser({
//           email: email,
//           password: password,
//           email_confirm: true,
//           user_metadata: metadata,
//         });

//         if (error) throw error;
//         return {
//           code: 200,
//           data: data,
//           success: true,
//         };
//       }
//       const { data, error } = await adminAuthClient.auth.admin.createUser({
//         email: email,
//         password: password,
//         email_confirm: true,
//       });

//       if (error) throw error;
//       return {
//         code: 200,
//         data: data,
//         success: true,
//       };
//     } catch (error: any) {
//       return {
//         code: error.status,
//         data: error,
//         success: false,
//         messages: error.message,
//       };
//     }
//   },

//   deleteUser: async (id: string): Promise<ResponseEndpoint> => {
//     try {
//       const { data, error } = await adminAuthClient.auth.admin.deleteUser(id);
//       if (error) throw error;
//       return {
//         code: 200,
//         data: data,
//         success: true,
//       };
//     } catch (error: any) {
//       return {
//         code: error.status,
//         data: error,
//         success: false,
//         messages: error.message,
//       };
//     }
//   },
//   loginWithGoogle: async (): Promise<ResponseEndpoint> => {
//     try {
//       const { data, error } = await supabase.auth.signInWithOAuth({
//         provider: "google",
//         options: {
//           redirectTo: process.env.NEXT_PUBLIC_URL_REDIRECT,
//         },
//       });

//       if (error) throw error;

//       return {
//         code: 200,
//         data: data,
//         success: true,
//       };
//     } catch (error: any) {
//       return {
//         code: error.status,
//         data: error,
//         success: false,
//         messages: error.message,
//       };
//     }
//   },
//   resetPasswordForEmail: async (email: string): Promise<ResponseEndpoint> => {
//     try {
//       const { error } = await supabase.auth.resetPasswordForEmail(email, {
//         redirectTo: `${process.env.NEXT_PUBLIC_URL}/password-reset`,
//       });
//       if (error) throw error;
//       return {
//         success: true,
//         messages:
//           "Se ha enviado exitosamente el link de restablecimiento de contraseña!",
//         code: 200,
//         data: {},
//       };
//     } catch (error: any) {
//       return {
//         success: false,
//         messages: error.message,
//         code: error.status || 500,
//         data: {},
//       };
//     }
//   },
// };
