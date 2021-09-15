import './Ranking.css'

const Ranking = () => {
    let users = JSON.parse(localStorage.getItem('users')) 
    users = users === null ? [] : users

    const prova = () => { console.log(users) }

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
                <button onClick={prova}>click</button>
            </div>
        </>
    )
}
export default Ranking