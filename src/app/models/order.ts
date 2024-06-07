export type Order = {

    orderId?:string,
    date?:string,
    dishes?: [
      {
        name?:string,
        price?: number,
        category?: string,
        imageUrl?:string,
        description?:string
      }
    ],
    totalPrice?:number

}
