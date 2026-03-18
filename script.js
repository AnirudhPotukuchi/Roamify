document.addEventListener("DOMContentLoaded", () => {
    const destinations = [
        {
            id: 1,
            name: "Varanasi",
            location: "Uttar Pradesh",
            bestTime: "October to March",
            nearby: "Allahabad, Sarnath",
            costPerPerson: 6000,
            image: "./Places/Varanasi.png"
        },
        {
            id: 2,
            name: "Lakshadweep Islands",
            location: "Arabian Sea",
            bestTime: "October to March",
            nearby: "Agatti, Bangaram",
            costPerPerson: 9000,
            image: "./Places/Lakshadweep.png"
        },
        {
            id: 3,
            name: "Kashmir Valley",
            location: "Jammu & Kashmir",
            bestTime: "March to August",
            nearby: "Srinagar, Gulmarg",
            costPerPerson: 8000,
            image: "./Places/Kashmir.png"
        },
        {
            id: 4,
            name: "Hampi",
            location: "Karnataka",
            bestTime: "October to February",
            nearby: "Hospet, Ballari",
            costPerPerson: 5000,
            image: "./Places/Hampi.png"
        },
        {
            id: 5,
            name: "Jaipur",
            location: "Rajasthan",
            bestTime: "October to March",
            nearby: "Amer Fort, Hawa Mahal",
            costPerPerson: 7000,
            image: "./Places/Jaipur.png"
        },
        {
            id: 6,
            name: "Mumbai",
            location: "Maharashtra",
            bestTime: "October to March",
            nearby: "Gateway of India, Marine Drive",
            costPerPerson: 8000,
            image: "./Places/Mumbai.png"
        }
    ];

    let travelPlan = [];

    // DOM Elements
    const destinationsContainer = document.getElementById("destinations-container");
    const planTbody = document.getElementById("plan-tbody");
    
    // Summary elements
    const totalDestCount = document.getElementById("total-dest-count");
    const livingCostDisp = document.getElementById("living-cost");
    const totalBudget = document.getElementById("total-budget");
    
    // Form Inputs
    const daysInput = document.getElementById("days");
    const personsInput = document.getElementById("persons");

    // Render Destinations
    function renderDestinations() {
        destinationsContainer.innerHTML = "";
        destinations.forEach(dest => {
            const card = document.createElement("div");
            card.className = "dest-card";
            card.innerHTML = `
                <img src="${dest.image}" alt="${dest.name}" class="dest-image">
                <div class="dest-info">
                    <h3>${dest.name}</h3>
                    <p><strong>Location:</strong> ${dest.location}</p>
                    <p><strong>Best Time:</strong> ${dest.bestTime}</p>
                    <p><strong>Nearby:</strong> ${dest.nearby}</p>
                    <p class="cost">Est. Cost: ₹${dest.costPerPerson} / person</p>
                    <button class="add-btn" data-id="${dest.id}">Add to Plan</button>
                </div>`;
            destinationsContainer.appendChild(card);
        });

        // Add Event Listeners to generated buttons
        const addButtons = document.querySelectorAll(".add-btn");
        addButtons.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const id = parseInt(e.target.getAttribute("data-id"));
                addToPlan(id);
            });
        });
    }

    // Add Destination to Plan
    function addToPlan(id) {
        const dest = destinations.find(d => d.id === id);
        if (!travelPlan.find(d => d.id === id)) {
            travelPlan.push(dest);
            renderPlan();
        } else {
            alert("This destination is already in your travel plan!");
        }
    }

    // Remove Destination from Plan
    function removeFromPlan(id) {
        travelPlan = travelPlan.filter(d => d.id !== id);
        renderPlan();
    }

    // Render Selected Plan Table
    function renderPlan() {
        planTbody.innerHTML = "";
        
        if (travelPlan.length === 0) {
            planTbody.innerHTML = `<tr><td colspan="3" class="empty-state">No destinations added yet.</td></tr>`;
        } else {
            travelPlan.forEach(dest => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${dest.name}</td>
                    <td>₹${dest.costPerPerson}</td>
                    <td><button class="remove-btn" data-id="${dest.id}">Remove</button></td>
                `;
                planTbody.appendChild(tr);
            });

            // Add Event Listeners for remove buttons
            const removeButtons = document.querySelectorAll(".remove-btn");
            removeButtons.forEach(btn => {
                btn.addEventListener("click", (e) => {
                    const id = parseInt(e.target.getAttribute("data-id"));
                    removeFromPlan(id);
                });
            });
        }
        updateSummary();
    }

    // Calculate and Update Budget Summary
    function updateSummary() {
        const days = parseInt(daysInput.value) || 1;
        const persons = parseInt(personsInput.value) || 1;

        // View total number of selected destinations
        totalDestCount.textContent = travelPlan.length;

        // Base cost sum of all selected destinations per person
        const locationsCostPerPerson = travelPlan.reduce((sum, dest) => sum + dest.costPerPerson, 0);
        
        // Assume daily living expense (food, local transport) is ₹500 per day
        const dailyLivingCost = 500 * days * persons;
        livingCostDisp.textContent = dailyLivingCost;

        // Total budget = (Locations core cost * persons) + Daily living expenses
        const finalTotalEstimate = (locationsCostPerPerson * persons) + dailyLivingCost;
        totalBudget.textContent = finalTotalEstimate;
    }

    // Input Event Handling (Responsive update to summary)
    daysInput.addEventListener("input", updateSummary);
    personsInput.addEventListener("input", updateSummary);

    // Payment Logic
    const paymentBtn = document.querySelector(".payment-btn");
    const customerNameInput = document.getElementById("customer-name");

    if (paymentBtn) {
        paymentBtn.addEventListener("click", () => {
            if (travelPlan.length === 0) {
                alert("Please add at least one destination to your travel plan.");
                return;
            }
            if (!customerNameInput.value.trim()) {
                alert("Please enter a Customer Name before proceeding to payment.");
                return;
            }
            window.location.href = "success.html";
        });
    }

    // Initial render
    renderDestinations();
    updateSummary();
});