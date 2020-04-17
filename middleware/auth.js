export default function({ store, route, redirect, app }) {
  const token = app.$cookies.get('gh-token')

  // console.warn('authenticated isLogin:', isLogin)

  // If the user authenticated
  if (!token) {
    return redirect('/login/?prevURL=' + route.path)
  }
}
