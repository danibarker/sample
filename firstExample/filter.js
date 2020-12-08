function filterResources() {
    let selection = document.getElementById("resourceDropDown");
    let resources = document.getElementsByClassName("resource");
    for (element of resources) {
        if (element.id !== selection.value && selection.value !== "all") {
            element.classList.add("hidden");
        } else {
            element.classList.remove("hidden");
        }
    }
}
