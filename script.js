// Application State
let currentScreen = "login"
let isLoggedIn = false

// Project Data
const projectData = {
  clientName: "Acme Corporation",
  projectName: "Brand Identity & Website Redesign",
  phases: [
    { name: "Discovery & Strategy", progress: 100, status: "completed" },
    { name: "Branding & Visual Identity", progress: 85, status: "in-progress" },
    { name: "Website Design", progress: 60, status: "in-progress" },
    { name: "Development", progress: 0, status: "upcoming" },
    { name: "Launch & Optimization", progress: 0, status: "upcoming" },
  ],
  nextMilestone: "Brand Guidelines Review",
  nextMilestoneDate: "March 15, 2024",
}

const deliveries = [
  {
    id: 1,
    name: "Brand Guidelines v2.1",
    date: "March 10, 2024",
    type: "Brand Identity",
    status: "delivered",
  },
  {
    id: 2,
    name: "Logo Concepts - Round 2",
    date: "March 5, 2024",
    type: "Brand Identity",
    status: "feedback-pending",
  },
  {
    id: 3,
    name: "Wireframes v1.0",
    date: "February 28, 2024",
    type: "Website Design",
    status: "approved",
  },
  {
    id: 4,
    name: "Brand Strategy Document",
    date: "February 20, 2024",
    type: "Strategy",
    status: "approved",
  },
  {
    id: 5,
    name: "Competitive Analysis",
    date: "February 15, 2024",
    type: "Research",
    status: "approved",
  },
]

// DOM Elements
const loginScreen = document.getElementById("login-screen")
const mainApp = document.getElementById("main-app")
const loginForm = document.getElementById("login-form")
const logoutBtn = document.getElementById("logout-btn")
const navBtns = document.querySelectorAll(".nav-btn")
const dashboardContent = document.getElementById("dashboard-content")
const historyContent = document.getElementById("history-content")

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
  setupEventListeners()
})

function initializeApp() {
  showScreen("login")
  renderDashboard()
  renderProjectHistory()
}

function setupEventListeners() {
  // Login form
  loginForm.addEventListener("submit", handleLogin)

  // Logout button
  logoutBtn.addEventListener("click", handleLogout)

  // Navigation buttons
  navBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const screen = this.getAttribute("data-screen")
      switchContent(screen)
    })
  })

  // Download buttons (mock functionality)
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-primary") || e.target.classList.contains("download-btn")) {
      if (e.target.innerHTML.includes("Download") || e.target.classList.contains("download-btn")) {
        handleDownload(e)
      }
    }
  })
}

function handleLogin(e) {
  e.preventDefault()
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  if (email && password) {
    isLoggedIn = true
    showScreen("main")
    switchContent("dashboard")
  }
}

function handleLogout() {
  isLoggedIn = false
  currentScreen = "login"
  showScreen("login")

  // Reset form
  document.getElementById("email").value = ""
  document.getElementById("password").value = ""
}

function showScreen(screen) {
  const screens = document.querySelectorAll(".screen")
  screens.forEach((s) => s.classList.remove("active"))

  if (screen === "login") {
    loginScreen.classList.add("active")
  } else if (screen === "main") {
    mainApp.classList.add("active")
  }
}

function switchContent(contentType) {
  // Update navigation
  navBtns.forEach((btn) => {
    btn.classList.remove("active")
    if (btn.getAttribute("data-screen") === contentType) {
      btn.classList.add("active")
    }
  })

  // Update content
  const contentScreens = document.querySelectorAll(".content-screen")
  contentScreens.forEach((screen) => screen.classList.remove("active"))

  if (contentType === "dashboard") {
    dashboardContent.classList.add("active")
  } else if (contentType === "history") {
    historyContent.classList.add("active")
  }
}

function renderDashboard() {
  // Update client name
  document.getElementById("client-name").textContent = projectData.clientName

  // Calculate and update overall progress
  const overallProgress = Math.round(
    projectData.phases.reduce((acc, phase) => acc + phase.progress, 0) / projectData.phases.length,
  )
  document.getElementById("overall-progress").textContent = overallProgress + "%"

  // Render progress list
  const progressList = document.getElementById("progress-list")
  progressList.innerHTML = ""

  projectData.phases.forEach((phase) => {
    const progressItem = document.createElement("div")
    progressItem.className = "progress-item"

    progressItem.innerHTML = `
            <div class="progress-header">
                <span class="progress-name">${phase.name}</span>
                <div class="progress-info">
                    <span class="progress-percentage">${phase.progress}%</span>
                    <div class="status-dot status-${phase.status}"></div>
                </div>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${phase.progress}%"></div>
            </div>
        `

    progressList.appendChild(progressItem)
  })

  // Animate progress bars
  setTimeout(() => {
    const progressFills = document.querySelectorAll(".progress-fill")
    progressFills.forEach((fill, index) => {
      fill.style.width = projectData.phases[index].progress + "%"
    })
  }, 100)
}

function renderProjectHistory() {
  const tbody = document.getElementById("deliverables-tbody")
  tbody.innerHTML = ""

  deliveries.forEach((delivery) => {
    const row = document.createElement("tr")

    const statusClass = getStatusClass(delivery.status)
    const statusText = getStatusText(delivery.status)

    row.innerHTML = `
            <td><span class="deliverable-name">${delivery.name}</span></td>
            <td>${delivery.type}</td>
            <td>${delivery.date}</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td><button class="download-btn"><i class="fas fa-download"></i></button></td>
        `

    tbody.appendChild(row)
  })
}

function getStatusClass(status) {
  switch (status) {
    case "delivered":
      return "status-delivered"
    case "feedback-pending":
      return "status-feedback-pending"
    case "approved":
      return "status-approved"
    default:
      return "status-delivered"
  }
}

function getStatusText(status) {
  switch (status) {
    case "delivered":
      return "Delivered"
    case "feedback-pending":
      return "Feedback Pending"
    case "approved":
      return "Approved"
    default:
      return status
  }
}

function handleDownload(e) {
  e.preventDefault()

  // Mock download functionality
  const button = e.target.closest("button")
  const originalText = button.innerHTML

  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...'
  button.disabled = true

  setTimeout(() => {
    button.innerHTML = '<i class="fas fa-check"></i> Downloaded!'

    setTimeout(() => {
      button.innerHTML = originalText
      button.disabled = false
    }, 2000)
  }, 1500)
}

// Smooth transitions for better UX
function addSmoothTransitions() {
  const style = document.createElement("style")
  style.textContent = `
        .screen {
            transition: opacity 0.3s ease-in-out;
        }
        
        .content-screen {
            transition: opacity 0.2s ease-in-out;
        }
        
        .progress-fill {
            transition: width 0.8s ease-out;
        }
    `
  document.head.appendChild(style)
}

// Initialize smooth transitions
addSmoothTransitions()
