import QuickBooksCard from './QuickBooksCard'
import CompanyStakeHolderCard from './CompanyStakeHolderCard'

const AccountingInformation = (props) => {
    return (
        <div className="row row--mb">
            <QuickBooksCard />
            <CompanyStakeHolderCard onclick={props.onclick}/>
        </div>
    )
}

export default AccountingInformation