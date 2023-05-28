document.addEventListener('DOMContentLoaded', async () => {
    const tokenLocal = localStorage.getItem('token')
    const tokenSession = sessionStorage.getItem('token')

    if (!tokenLocal && !tokenSession) {
        window.location.href = '../../index.html'
        return
    }
});