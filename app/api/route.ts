export async function GET(request:Request){
    const res = await fetch(request)
    const cards = await res.json()
    
    return Response.json(cards)
}

export async function POST(request:Request){
    const res = await fetch(request)
     
      const data = await res.json()
     
      return Response.json(data)
}