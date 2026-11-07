// import { proxy } from "valtio";

// type ProductType = {
//     uiiditem: number;
//     title: string;
//     qte: number;
//     prixuniter: string;
//     prix: string;
//     imageUrl: string;
// };

// type StoreType = {
//     id: number;
//     selectedCategorie: any;
//     selectedImage: any;
//     Mode: {
//         type: string;
//         Heur: string;
//     };
//     Panier: ProductType[];
// };

// const defaultStateStore: StoreType = {
//     id: 0,
//     selectedCategorie: '',
//     selectedImage: "",
//     Mode: {
//         type: "Liv/Empo",
//         Heur: "12h:30"
//     },
//     Panier: [],
// };

// const initialStateStore = defaultStateStore;

// const store = proxy<StoreType>(initialStateStore);

// export function setId(id: number): void {
//     store.id = id;
// }


// export function setSelectedCategorie(selectedCategorie: any): void {
//     store.selectedCategorie = selectedCategorie;
// }

// export function setSelectedImage(selectedImage: any): void {
//     store.selectedImage = selectedImage;
// }

// export function setMode(): void {
//     store.Mode = defaultStateStore.Mode;
// }

// export function addToCart(product: any): void {
//     store.Panier = product
// }

// export default store;
import { proxy } from "valtio";

type ProductType = {
    uiiditem: number;
    title: string;
    qte: number;
    prixuniter: string;
    prix: string;
    imageUrl:{
        Default: {
          urlDefault: string;
        };
      };
};

type StoreType = {
    id: number;
    selectedCategorie: any;
    selectedImage: any;
    Mode: {
        type: string;
        Heur: string;
    };
    Panier: ProductType[];
    isFromPayment:boolean
};
// let DataPanier =[]
// const panierJSON = localStorage.getItem("Panier");
// if (panierJSON) {
//     DataPanier =JSON.parse(panierJSON);
// }

let DataPanier = [];

if (typeof window !== "undefined") {
    const panierJSON = localStorage.getItem("Panier");
    if (panierJSON) {
        DataPanier = JSON.parse(panierJSON);

    }}
const defaultStateStore: StoreType = {
    id: 0,
    selectedCategorie: '',
    selectedImage: "",
    Mode: {
        type: "Liv/Empo",
        Heur: "12h:30"
    },
    Panier: DataPanier,
    isFromPayment:false
};

const initialStateStore = defaultStateStore;

const store = proxy<StoreType>(initialStateStore);

export function setId(id: number): void {
    store.id = id;
}


export function setSelectedCategorie(selectedCategorie: any): void {
    store.selectedCategorie = selectedCategorie;
}

export function setSelectedImage(selectedImage: any): void {
    store.selectedImage = selectedImage;
}

export function setMode(): void {
    store.Mode = defaultStateStore.Mode;
}

// export function addToCart(product: any): void {
//     store.Panier = product
// }

export function addToCart(product: any): void {
    console.log("Updating cart with new product array", product);
    store.Panier = product;
    console.log("New store state:", store.Panier);
  }
  export function ClearCart(): void {
    store.Panier =[]
  }
  
  export function setIsFromPayment(isFromPayment: boolean): void {
    store.isFromPayment = isFromPayment;
  }

export default store;