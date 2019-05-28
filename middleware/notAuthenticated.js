export default function({ store, redirect }) {
  // If the user is not authenticated route to login
  if (!store.state.user) {
    return redirect('/')
  }
}
