import { auth } from "./firebase_config";

function App(){
    return(
        <>
        <h2>Thanks for signing in</h2>
        <button onClick={()=> auth.signOut()}>Sign out</button>
        </>
    )
}

export default App;