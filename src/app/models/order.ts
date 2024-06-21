
export type Order = {
  orderId?: string,
  date?: string,
  dishes?: [
    {
      dishname?: string,
      price?: number,
      category?: string,
      imageUrl?: string,
      description?: string,
      quantity?: number  
    }
  ],
  totalPrice?: number
}
