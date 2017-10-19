/**
 * Created by Jess on 17/08/2017.
 */
export interface Pedido {
  cliente: string;
  categoria_producto: string;
  nombre_producto: string;
  cantidad: number;
  precio_individual: number;
  precio_total: number;
  imagen:  string;
  latitud:  number;
  longitud: number;
  estado:  string;
}
