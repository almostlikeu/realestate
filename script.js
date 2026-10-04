document.addEventListener("DOMContentLoaded", () => {
    // Comprehensive list of Dubai Communities
    const dubaiCommunities = [
        "Al Barari", "Al Furjan", "Arabian Ranches", "Arabian Ranches 2", "Arabian Ranches 3", 
        "Business Bay", "DAMAC Hills", "DAMAC Hills 2", "Downtown Dubai", "Dubai Creek Harbour", 
        "Dubai Hills Estate", "Dubai Marina", "Dubai South", "Emaar Beachfront", "Emaar South", 
        "Emirates Hills", "Jumeirah Beach Residence (JBR)", "Jumeirah Golf Estates", 
        "Jumeirah Lake Towers (JLT)", "Jumeirah Village Circle (JVC)", "Jumeirah Village Triangle (JVT)", 
        "Meydan", "Motor City", "Palm Jebel Ali", "Palm Jumeirah", "Town Square", "The Villa"
    ];

    // Initialize search functionality for all search bars on the site
    const areaInputs = document.querySelectorAll('.area-input');
    
    areaInputs.forEach(input => {
        const container = input.closest('.search-field');
        const dropdown = container.querySelector('.autocomplete-dropdown');
        const tagContainer = container.querySelector('.tag-container');
        let selectedAreas = new Set();

        // Render Tags
        const updateTags = () => {
            tagContainer.innerHTML = '';
            selectedAreas.forEach(area => {
                const tag = document.createElement('span');
                tag.className = 'area-tag';
                tag.innerHTML = `${area} <i class="fas fa-times" data-area="${area}"></i>`;
                tagContainer.appendChild(tag);
            });
        };

        // Remove Tag Event
        tagContainer.addEventListener('click', (e) => {
            if (e.target.tagName === 'I') {
                selectedAreas.delete(e.target.dataset.area);
                updateTags();
            }
        });

        // Filter and show dropdown
        input.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase();
            dropdown.innerHTML = '';
            
            if (val.length > 0) {
                const matches = dubaiCommunities.filter(c => c.toLowerCase().includes(val) && !selectedAreas.has(c));
                
                if (matches.length > 0) {
                    matches.forEach(match => {
                        const item = document.createElement('div');
                        item.className = 'autocomplete-item';
                        item.textContent = match;
                        item.addEventListener('click', () => {
                            selectedAreas.add(match);
                            updateTags();
                            input.value = '';
                            dropdown.classList.remove('show');
                        });
                        dropdown.appendChild(item);
                    });
                    dropdown.classList.add('show');
                } else {
                    dropdown.classList.remove('show');
                }
            } else {
                dropdown.classList.remove('show');
            }
        });

        // Hide dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!container.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });
    });

    // Form Submission
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("Thank you. Your request has been securely submitted to mypropsearch.");
            form.reset();
        });
    });
});