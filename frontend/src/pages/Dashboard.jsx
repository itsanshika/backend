import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import GoalForm from '../components/GoalForm'
import {getGoals, reset} from '../features/goals/goalSlice'
import GoalItem from '../components/GoalItem'
import { spinner } from '../components/spinner'

function Dashboard() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const { goals, isError, isSuccess, isloading, message } = useSelector((state) => state.goals)

  useEffect(()=>{
    if(!user)
    {
      navigate('/login')
    }
    dispatch(getGoals())



    return () =>
    {
      dispatch(reset())
    }
  },[user,navigate, isError, dispatch, message])


  if (isloading) {
    return <spinner />
}


  return (
    <>
    <section className="heading">
      <h1> Welcome {user && user.name}</h1>
      <p> Goals Dashboard</p>
    </section>
    <GoalForm />

    <section className="content">
    {goals.length > 0 ? (
      <div className="goals">
       { goals.map((goal) => (<GoalItem key={goal._id} goal={goal} />)
        )}

      </div>
    ) :  (<h3>You have no goals yet!</h3>)}


    </section>
    </>
  )
}

export default Dashboard