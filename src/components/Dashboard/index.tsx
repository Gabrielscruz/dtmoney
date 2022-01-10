import { Container} from './styles'
import { Summary } from '../Summary'
import { TransitionsTable } from '../TransactionsTable'

export  function Dashboard(){
    return (
        <Container>
                <Summary/>
                <TransitionsTable/>
        </Container>
    )
}