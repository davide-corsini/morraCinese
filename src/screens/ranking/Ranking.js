import './Ranking.css'

const Ranking = () => {
    let users = JSON.parse(localStorage.getItem('users')) 
    users = users === null ? [] : users

    return (
        <>
            <div className="RankingContainer">
                <div className="SubRankingContainer">
                    {
                        users && users.map((el, _) => {
                            return (
                                <div className="RankingRow">
                                    {el.username}
                                    {el.rank}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}
export default Ranking