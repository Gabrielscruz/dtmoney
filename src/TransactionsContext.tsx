import { createContext , useState , useEffect , ReactNode} from 'react'
import {api} from './services/api'

interface TransactionsProps {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

type TransactionsInput = Omit<TransactionsProps, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
    children: ReactNode
}

interface TransactionsContextData {
    transactions: TransactionsProps[],
    createTransaction: (transaction: TransactionsInput) =>  Promise<void>,
}

export const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);



export function TransactionsProvider({ children }: TransactionsProviderProps) {
    
    const [ transactions , SetTransactions] = useState<TransactionsProps[]>([])

    useEffect(() => {
        api.get('/transactions')
        .then(reponse => SetTransactions(reponse.data.transactions))
    },[])

    async function createTransaction(transactionInput:TransactionsInput){
      const response = await api.post('/transactions', {
          ...transactionInput 
          , createdAt: new Date()
        })
        
      const { transaction  } = response.data;

      SetTransactions([
          ...transactions,
        transaction
      ])
    }

    return (
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
        
    )

}