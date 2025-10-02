const openModal = document.getElementById("openShareModal");
const closeModal = document.getElementById("closeShareModal");
const modal = document.getElementById("shareModal");

openModal.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

function copyLink() {
  const link = "https://linktr.ee/jakerson";
  navigator.clipboard.writeText(link).then(() => {
    alert("Link copied to clipboard ✅");
  });
}
