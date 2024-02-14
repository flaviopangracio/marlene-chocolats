import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
  CardFooter,
} from "./components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

import jsonData from "./data.json";

type DataItem = {
  title: string;
  description: string;
  imageUrl: string;
  price: {
    [key: string]: number;
  };
  bestSeller?: boolean;
};

interface IData {
  [key: string]: DataItem[];
}

const data: IData = jsonData;

export function App() {
  return (
    <div className="p-2 max-w-4xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold text-center mt-5 tracking-tight text-black sm:text-4xl">
          Parcelamos em até 10x no cartão
        </h2>
        <p className="mt-1 mb-2 text-lg leading-5 text-gray-500 text-center">
          Escolha até 3 recheios para o seu ovo de colher
        </p>
        <Tabs defaultValue="Ovos de Colher">
          <TabsList className="grid w-full grid-cols-2 h-12">
            {Object.keys(data).map((key) => (
              <TabsTrigger className="h-10" value={key}>
                {key}
              </TabsTrigger>
            ))}
          </TabsList>
          {Object.keys(data).map((key) => (
            <TabsContent value={key}>
              {data[key].map((item: DataItem) => (
                <div className="mt-4">
                  <Card>
                    <CardContent>
                      <div className="w-full pt-5">
                        <img
                          src={item.imageUrl}
                          className="object-cover w-full rounded-xl"
                        ></img>
                      </div>
                    </CardContent>
                    <CardHeader>
                      <CardTitle className="text-2xl">{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                      <Tabs className="mt-3" defaultValue="Médio">
                        <TabsList className="h-12">
                          {Object.keys(item.price).map((size) => (
                            <TabsTrigger className="h-10" value={size}>
                              {size}
                            </TabsTrigger>
                          ))}
                        </TabsList>
                        {Object.keys(item.price).map((size) => (
                          <TabsContent value={size}>
                            <text>
                              Em até 10x de{" "}
                              <text className="text-xl">
                                R${" "}
                                {((item.price[size] * (1 + 0.15)) / 10).toFixed(
                                  2
                                )}
                                /mês
                              </text>
                            </text>
                            <br />
                            <text>
                              ou{" "}
                              <text className="text-green-500">
                                R${item.price[size].toFixed(2)} à vista
                              </text>
                            </text>
                          </TabsContent>
                        ))}
                      </Tabs>
                    </CardHeader>
                    <CardFooter>
                      <Button variant="ghost">Comprar</Button>
                      {item.bestSeller && (
                        <Badge className="ml-3" variant="destructive">
                          Mais vendido
                        </Badge>
                      )}
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
