export default function({ store, redirect }) {
  // If the user is authenticated redirect to search page
  if (store.state.user) {
    return redirect('/search')
  }
}
