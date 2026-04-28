import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { use } from "react"

export default function ProductCard({ product }) {

  const allProducts =use(product)

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
      {
        allProducts.map((elem) => {
          return <Card key={elem.id} className="relative mx-auto w-full max-w-sm pt-0 flex flex-col justify-between">
            <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
            <img
              src={elem.image}
              alt="Event cover"
              className="relative z-20 aspect-video w-full object-cover"
            />
            <CardHeader>
              <CardAction>
                <Badge variant="secondary">${elem.price}</Badge>
              </CardAction>
              <CardTitle>{elem.title}</CardTitle>
              <CardDescription>
                {elem.category}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full">Shop Now</Button>
            </CardFooter>
          </Card>
        })
      }
    </div>
  )
}
