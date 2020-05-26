window.addEventListener('scroll', function () {
    var scroll = document.querySelector('.scrollTop');
    scroll.classList.toggle("active", window.scrollY > 500)
})
const css = {
    change() {
        let showList = document.getElementById("showListSelected")
        if (showList) {
            if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
                showList.style.display = "block";
            } else {
                showList.style.display = "none";
            }
        }
    }
}