'use server';

import { CategoriesWithProductsResponse } from "@/app/admin/categories/categories.type";
import { CreateCategorySchemaServer, UpdateCategorySchema } from "@/app/admin/categories/create-category.schema";
import { createClient } from "@/supabase/server";
import { File } from "buffer";
import slugify from 'slugify'


export const getCategoriesWithProducts = async (): Promise<CategoriesWithProductsResponse> => {
    const supabase = await createClient()
    const {data, error} = await supabase.from('category').select("*, products:product(*)").returns<CategoriesWithProductsResponse>()
    if(error){
        throw new Error(`Error Fetching Details: ${error.message}`)
    }
    return data || []
}

export const imageUploadHandler = async (formData: FormData) => {
    const supabase = await createClient()
    if(!formData) return
    const fileEntry = formData.get('file')

    console.log(fileEntry instanceof File)

    if(!(fileEntry instanceof File)) throw new Error('Expected a file');

    const fileName = fileEntry.name;

    try{
        const {data, error} = await supabase.storage.from('app-images').upload(fileName, fileEntry, {cacheControl:'3600', upsert: false})
        if(error){
            console.log("Error Uploading Image", error)
            throw new Error(`Error uploading Image ${error.message}`)
        }
        const {data: {publicUrl}} = await supabase.storage.from('app-images').getPublicUrl(data.path)
        return publicUrl
    }catch(error){
        console.log('Error uploading Image:', error)
        throw new Error('Error Uploading image')
    }
}

export const createCategory = async ({
    imageUrl,
    name
}: CreateCategorySchemaServer) => {
    const supabase = await createClient()

    const slug = slugify(name, {lower: true});
    const {data, error} = await supabase.from('category').insert({
        name, imageUrl, slug
    });

    if(error) throw new Error(`Error Creating Category: ${error.message}`)
    return data
}

export const updateCategory = async({
    imageUrl, name, slug
}: UpdateCategorySchema) => {
    const supabase = await createClient()

    const {data, error} = await supabase.from('category').update({name, imageUrl}).match({slug});
    if(error){
        throw new Error(`Error updating category ${error.message}`)
        
    }
    return data
}

export const deleteCategory = async (id: number) => {
    const supabase = await createClient()

    const {error} = await supabase.from('category').delete().match({id});
    if(error) {
        throw new Error(`Could Not delete Category: ${error.message}`)
    }
}

export const getCategoryData = async () => {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('category')
      .select('name, products:product(id)');
  
    if (error) throw new Error(`Error fetching category data: ${error.message}`);
  
    const categoryData = data.map(
      (category: { name: string; products: { id: number }[] }) => ({
        name: category.name,
        products: category.products.length,
      })
    );
  
    return categoryData;
  };