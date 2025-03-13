// import { ResponseEndpoint } from '@/types/Response/response.interface';
// import { ResponseEndpoint } from "@/utils/types/Response/response.interface";
// import { adminAuthClient } from "@/utils/supabase/admin";
import { ResponseEndpoint } from "./response.interface";
import { supabase } from "./client";

export const database = {
  async getData(
    table: string,
    select: string,
    eqColumnOne?: string,
    eqOneValue?: string,
    eqColumnTwo?: string,
    eqTwoValue?: string
  ): Promise<ResponseEndpoint> {
    try {
      let query = supabase.from(table).select(select);

      if (eqColumnOne && eqOneValue) {
        query = query.eq(eqColumnOne, eqOneValue);
      }
      if (eqColumnTwo && eqTwoValue) {
        query = query.eq(eqColumnTwo, eqTwoValue);
      }

      const { data, error } = await query;
      if (error) throw error;
      return {
        success: true,
        code: 200,
        data: data,
      };
    } catch (error: any) {
      return {
        success: false,
        code: 400,
        data: [],
        messages: error.message,
      };
    }
  },
  insertItems: async (
    table: string,
    dataInsert: object
  ): Promise<ResponseEndpoint> => {
    try {
      const { error, data } = await supabase
        .from(table)
        .insert(dataInsert)
        .select("*");
      if (error) throw error;
      return {
        success: true,
        code: 200,
        data: data[0],
        messages: "",
      };
    } catch (error: any) {
      return {
        success: false,
        code: 400,
        data: [],
        messages: error.message,
      };
    }
  },
  // updateItems: async (
  //   table: string,
  //   dataUpdate: any,
  //   eqColumn?: any,
  //   eqValue?: string
  // ) => {
  //   const query = supabase.from(table).update(dataUpdate).eq(eqColumn, eqValue);
  //   const { data, error } = await query;
  //   if (error) {
  //     console.error(error);
  //     return null;
  //   }

  //   return data;
  // },

  // deleteitem: async (table: string, id: string) => {
  //   try {
  //     const { error } = await supabase.from(table).delete().eq("id", id);
  //     if (error) {
  //       throw error;
  //     }
  //     await adminAuthClient.auth.admin.deleteUser(id);
  //   } catch (error) {
  //   }
  // },
};
