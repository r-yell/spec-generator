console.log('Initial range-month-output value:', document.getElementById('range-month-output').textContent);

function updateScale() {
    const container = document.querySelector('.a3-container');
    const content = document.querySelector('.a3-content');
    
    // Convert mm to pixels (approximately)
    const mmToPx = 3.7795275591;
    const targetWidth = 297 * mmToPx;
    const targetHeight = 420 * mmToPx;
    
    // Calculate scale factors for both dimensions
    const scaleX = (container.clientWidth - 40) / targetWidth;
    const scaleY = (container.clientHeight - 40) / targetHeight;
    
    // Use the smaller scale factor to ensure content fits
    const scale = Math.min(scaleX, scaleY);
    
    // Apply the scale through CSS custom property
    content.style.setProperty('--scale-factor', scale);
}

// Initial scale
updateScale();

// Update scale when window is resized
window.addEventListener('resize', updateScale); 


// Range Month
const addRangeMonthButton = document.getElementById('add-range-month-button');
const rangeMonthInput = document.getElementById('range-month');
const rangeMonthOutput = document.getElementById('range-month-output');

// Load saved value when page loads
document.addEventListener('DOMContentLoaded', () => {
    const savedRangeMonth = localStorage.getItem('rangeMonth');
    if (savedRangeMonth) {
        rangeMonthOutput.textContent = savedRangeMonth;
    }
});

addRangeMonthButton.addEventListener('click', () => {
    const newValue = rangeMonthInput.value;
    rangeMonthOutput.textContent = newValue;
    // Save to localStorage
    localStorage.setItem('rangeMonth', newValue);
});

// Style Code
const addStyleCodeButton = document.getElementById('add-style-code-button');
const addMoreStyleCodeButton = document.getElementById('add-more-style-code-button');
const styleCodeInput = document.getElementById('style-code');
const styleCodeOutput = document.getElementById('style-code-output');
const styleCodeOutput2 = document.getElementById('style-code-output-2');

let additionalStyleCodeAdded = false;
let newTextArea = null;
let newUpdateButton = null;
let removeButton = null;

addStyleCodeButton.addEventListener('click', () => {
    const newValue = styleCodeInput.value;
    styleCodeOutput.textContent = newValue;
});

addMoreStyleCodeButton.addEventListener('click', () => {
    if (!additionalStyleCodeAdded) {
        // Create new textarea
        newTextArea = document.createElement('textarea');
        newTextArea.id = 'style-code-2';
        newTextArea.name = 'style-code-2';
        newTextArea.placeholder = 'Additional Style Code & Name';
        Object.assign(newTextArea.style, {
            width: '100%',
            height: '100pt',
            padding: '5pt',
            resize: 'none',
            whiteSpace: 'pre-wrap',
            overflowY: 'auto',
            marginBottom: '5pt'
        });

        // Create update button
        newUpdateButton = document.createElement('button');
        newUpdateButton.textContent = 'Update';
        newUpdateButton.addEventListener('click', () => {
            styleCodeOutput2.textContent = newTextArea.value;
        });

        // Create remove button
        removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            newTextArea.remove();
            newUpdateButton.remove();
            removeButton.remove();
            addMoreStyleCodeButton.style.display = 'inline';
            styleCodeOutput2.textContent = '';
            additionalStyleCodeAdded = false;
        });

        const container = styleCodeInput.parentElement;
        container.insertBefore(newTextArea, addMoreStyleCodeButton);
        container.insertBefore(newUpdateButton, addMoreStyleCodeButton);
        container.insertBefore(removeButton, addMoreStyleCodeButton);
        
        addMoreStyleCodeButton.style.display = 'none';
        additionalStyleCodeAdded = true;
    }
});


// Category
document.querySelectorAll('.category-btn').forEach(tag => {
    tag.addEventListener('click', () => {
        tag.classList.toggle('active');
        
        // Get all active category tags
        const activeTags = document.querySelectorAll('.category-list .tag.category-btn.active');
        const categoryOutput = document.getElementById('category-output');
        
        // Create array of active tag text content and join with " | "
        const activeTagsText = Array.from(activeTags).map(tag => tag.textContent).join(' | ');
        categoryOutput.textContent = activeTagsText;
    });
}); 

// Add Category
const addCategoryButton = document.getElementById('add-category-button');
const addCategoryInput = document.getElementById('add-category');
const categoryList = document.querySelector('.category-list');

// Helper function to create delete button
function createDeleteButton(tagElement) {
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '×';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent tag click event from firing
        tagElement.remove();
        // Update the corresponding output
        const listClass = tagElement.parentElement.className;
        let outputId;
        switch(true) {
            case listClass.includes('category-list'):
                outputId = 'category-output';
                break;
            case listClass.includes('placement-list'):
                outputId = 'placement-output';
                break;
            case listClass.includes('print-direction-list'):
                outputId = 'print-direction-output';
                break;
            case listClass.includes('technique-list'):
                outputId = 'technique-output';
                break;
            case listClass.includes('print-scale-list'):
                outputId = 'print-scale-output';
                break;
        }
        if (outputId) {
            const activeTags = tagElement.parentElement.querySelectorAll('.tag.active');
            const outputElement = document.getElementById(outputId);
            const separator = outputId === 'category-output' ? ' | ' : ', ';
            outputElement.textContent = Array.from(activeTags).map(tag => tag.textContent.replace('×', '')).join(separator);
        }
    });
    return deleteBtn;
}

addCategoryButton.addEventListener('click', () => {
    const newValue = addCategoryInput.value.trim();
    if (newValue) {
        const newCategory = document.createElement('li');
        newCategory.textContent = newValue.toUpperCase();
        newCategory.classList.add('tag', 'active');
        newCategory.appendChild(createDeleteButton(newCategory));
        
        // Add click event listener to new category
        newCategory.addEventListener('click', () => {
            newCategory.classList.toggle('active');
            
            // Update category output
            const activeTags = document.querySelectorAll('.category-list .tag.active');
            const categoryOutput = document.getElementById('category-output');
            const activeTagsText = Array.from(activeTags).map(tag => tag.textContent.replace('×', '')).join(' | ');
            categoryOutput.textContent = activeTagsText;
        });
        
        // Add to list and update output
        categoryList.appendChild(newCategory);
        
        // Update category output to include new active category
        const activeTags = document.querySelectorAll('.category-list .tag.active');
        const categoryOutput = document.getElementById('category-output');
        const activeTagsText = Array.from(activeTags).map(tag => tag.textContent.replace('×', '')).join(' | ');
        categoryOutput.textContent = activeTagsText;
        
        // Clear input
        addCategoryInput.value = '';
    }
});


// Page Label
const addPageLabelButton = document.getElementById('add-page-label-button');
const pageLabelInput1 = document.getElementById('add-page-label-1');
const pageLabelInput2 = document.getElementById('add-page-label-2');
const pageLabelOutput = document.getElementById('page-label-output');

// Set input type to number
pageLabelInput1.type = 'number';
pageLabelInput2.type = 'number';

// Prevent non-numeric input
[pageLabelInput1, pageLabelInput2].forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    });
    
    // Prevent paste of non-numeric values
    input.addEventListener('paste', (e) => {
        const pastedText = e.clipboardData.getData('text');
        if (!/^\d+$/.test(pastedText)) {
            e.preventDefault();
        }
    });
});

addPageLabelButton.addEventListener('click', () => {
    const value1 = pageLabelInput1.value;
    const value2 = pageLabelInput2.value;
    pageLabelOutput.textContent = `${value1} OF ${value2}`;
});

// Placement
document.querySelectorAll('.placement-btn').forEach( tag =>
    tag.addEventListener('click', () => {
        tag.classList.toggle('active');

        // Get all active placement tags
        const activeTags = document.querySelectorAll('.placement-list .tag.active');
        const placementOutput = document.getElementById('placement-output');

        // Create array of active tag text content and join with "  |  "
        const activeTagsText = Array.from(activeTags).map(tag => tag.textContent).join(', ');
        placementOutput.textContent = activeTagsText;
    })
);


// Add Placement
const addPlacementButton = document.getElementById('add-placement-button');
const addPlacementInput = document.getElementById('add-placement');
const placementList = document.querySelector('.placement-list');

// Helper function to create delete button
function createDeleteButton(tagElement) {
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '×';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent tag click event from firing
        tagElement.remove();
        // Update the corresponding output
        const listClass = tagElement.parentElement.className;
        let outputId;
        switch(true) {
            case listClass.includes('category-list'):
                outputId = 'category-output';
                break;
            case listClass.includes('placement-list'):
                outputId = 'placement-output';
                break;
            case listClass.includes('print-direction-list'):
                outputId = 'print-direction-output';
                break;
            case listClass.includes('technique-list'):
                outputId = 'technique-output';
                break;
            case listClass.includes('print-scale-list'):
                outputId = 'print-scale-output';
                break;
        }
        if (outputId) {
            const activeTags = tagElement.parentElement.querySelectorAll('.tag.active');
            const outputElement = document.getElementById(outputId);
            const separator = outputId === 'category-output' ? ' | ' : ', ';
            outputElement.textContent = Array.from(activeTags).map(tag => tag.textContent.replace('×', '')).join(separator);
        }
    });
    return deleteBtn;
}

// Event listener for when the "Add" button is clicked for placements
addPlacementButton.addEventListener('click', () => {
    const newValue = addPlacementInput.value.trim();
    if (newValue) {
        const newPlacement = document.createElement('li');
        newPlacement.textContent = newValue;
        newPlacement.classList.add('tag', 'active');
        newPlacement.appendChild(createDeleteButton(newPlacement));
        
        // Add click event listener to toggle the tag's active state
        newPlacement.addEventListener('click', () => {
            // Toggle the 'active' class when clicked
            newPlacement.classList.toggle('active');

            // Find all currently active placement tags
            const activeTags = document.querySelectorAll('.placement-list .tag.active');
            
            // Get the output element where active placements will be displayed
            const placementOutput = document.getElementById('placement-output');
            
            // Create comma-separated string of active tag text content
            // map() transforms each tag element to its text content
            // replace('×', '') removes the × symbol from the text
            // join(', ') combines all texts with comma and space
            const activeTagsText = Array.from(activeTags)
                .map(tag => tag.textContent.replace('×', ''))
                .join(', ');
            
            // Update the output text with active placements
            placementOutput.textContent = activeTagsText;
        });

        // Add the new placement tag to the placement list
        placementList.appendChild(newPlacement);
        
        // Update the output immediately after adding new tag
        // This is similar to the click handler above but runs immediately
        const activeTags = document.querySelectorAll('.placement-list .tag.active');
        const placementOutput = document.getElementById('placement-output');
        const activeTagsText = Array.from(activeTags)
            .map(tag => tag.textContent.replace('×', ''))
            .join(', ');
        placementOutput.textContent = activeTagsText;

        // Clear the input field after adding the tag
        addPlacementInput.value = '';
    }
});

// Print Direction
document.querySelectorAll('.print-direction-btn').forEach(tag =>
    tag.addEventListener('click', () => {
        // Deactivate all other tags first
        document.querySelectorAll('.print-direction-list .tag.active').forEach(activeTag => {
            if (activeTag !== tag) {
                activeTag.classList.remove('active');
            }
        });
        
        tag.classList.toggle('active');

        // Get the active print direction tag
        const activeTag = document.querySelector('.print-direction-list .tag.active');
        const printDirectionOutput = document.getElementById('print-direction-output');

        // Set output to active tag's text or empty if none active
        printDirectionOutput.textContent = activeTag ? activeTag.textContent : '';
    })
);

// Add Print Direction
const addPrintDirectionButton = document.getElementById('add-print-direction-button');
const addPrintDirectionInput = document.getElementById('add-print-direction');
const printDirectionList = document.querySelector('.print-direction-list');

// Helper function to create delete button
function createDeleteButton(tagElement) {
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '×';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent tag click event from firing
        tagElement.remove();
        // Update the corresponding output
        const listClass = tagElement.parentElement.className;
        let outputId;
        switch(true) {
            case listClass.includes('category-list'):
                outputId = 'category-output';
                break;
            case listClass.includes('placement-list'):
                outputId = 'placement-output';
                break;
            case listClass.includes('print-direction-list'):
                outputId = 'print-direction-output';
                break;
            case listClass.includes('technique-list'):
                outputId = 'technique-output';
                break;
            case listClass.includes('print-scale-list'):
                outputId = 'print-scale-output';
                break;
        }
        if (outputId) {
            const activeTags = tagElement.parentElement.querySelectorAll('.tag.active');
            const outputElement = document.getElementById(outputId);
            const separator = outputId === 'category-output' ? ' | ' : ', ';
            outputElement.textContent = Array.from(activeTags).map(tag => tag.textContent.replace('×', '')).join(separator);
        }
    });
    return deleteBtn;
}

addPrintDirectionButton.addEventListener('click', () => {
    const newValue = addPrintDirectionInput.value.trim();
    if (newValue) {
        const newPrintDirection = document.createElement('li');
        newPrintDirection.textContent = newValue;
        newPrintDirection.classList.add('tag');
        newPrintDirection.appendChild(createDeleteButton(newPrintDirection));
        
        // Add click event listener to new print direction
        newPrintDirection.addEventListener('click', () => {
            // Deactivate all other tags first
            document.querySelectorAll('.print-direction-list .tag.active').forEach(activeTag => {
                if (activeTag !== newPrintDirection) {
                    activeTag.classList.remove('active');
                }
            });
            
            newPrintDirection.classList.toggle('active');

            // Update print direction output
            const activeTag = document.querySelector('.print-direction-list .tag.active');
            const printDirectionOutput = document.getElementById('print-direction-output');
            printDirectionOutput.textContent = activeTag ? activeTag.textContent.replace('×', '') : '';
        });

        // Add to list
        printDirectionList.appendChild(newPrintDirection);
        
        // Clear input
        addPrintDirectionInput.value = '';
    }
});


// Technique
document.querySelectorAll('.technique-btn').forEach( tag =>
    tag.addEventListener('click', () => {
        tag.classList.toggle('active');

        // Get all active technique tags
        const activeTags = document.querySelectorAll('.technique-list .tag.active');
        const techniqueOutput = document.getElementById('technique-output');

        // Create array of active tag text content and join with " | "
        const activeTagsText = Array.from(activeTags).map(tag => tag.textContent).join(', ');
        techniqueOutput.textContent = activeTagsText;   
    })
);  

// Add Technique
const addTechniqueButton = document.getElementById('add-technique-button');
const addTechniqueInput = document.getElementById('add-technique');
const techniqueList = document.querySelector('.technique-list');    

// Helper function to create delete button
function createDeleteButton(tagElement) {
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '×';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent tag click event from firing
        tagElement.remove();
        // Update the corresponding output
        const listClass = tagElement.parentElement.className;
        let outputId;
        switch(true) {
            case listClass.includes('category-list'):
                outputId = 'category-output';
                break;
            case listClass.includes('placement-list'):
                outputId = 'placement-output';
                break;
            case listClass.includes('print-direction-list'):
                outputId = 'print-direction-output';
                break;
            case listClass.includes('technique-list'):
                outputId = 'technique-output';
                break;
            case listClass.includes('print-scale-list'):
                outputId = 'print-scale-output';
                break;
        }
        if (outputId) {
            const activeTags = tagElement.parentElement.querySelectorAll('.tag.active');
            const outputElement = document.getElementById(outputId);
            const separator = outputId === 'category-output' ? ' | ' : ', ';
            outputElement.textContent = Array.from(activeTags).map(tag => tag.textContent.replace('×', '')).join(separator);
        }
    });
    return deleteBtn;
}

addTechniqueButton.addEventListener('click', () => {
    const newValue = addTechniqueInput.value.trim();
    if (newValue) {
        const newTechnique = document.createElement('li');
        newTechnique.textContent = newValue;
        newTechnique.classList.add('tag', 'active');
        newTechnique.appendChild(createDeleteButton(newTechnique));
        
        // Add click event listener to new technique
        newTechnique.addEventListener('click', () => {
            newTechnique.classList.toggle('active');

            // Update technique output
            const activeTags = document.querySelectorAll('.technique-list .tag.active');
            const techniqueOutput = document.getElementById('technique-output');
            const activeTagsText = Array.from(activeTags).map(tag => tag.textContent.replace('×', '')).join(', ');
            techniqueOutput.textContent = activeTagsText;
        });

        // Add to list and update output
        techniqueList.appendChild(newTechnique);
        
        // Update technique output immediately after adding new tag
        const activeTags = document.querySelectorAll('.technique-list .tag.active');
        const techniqueOutput = document.getElementById('technique-output');
        const activeTagsText = Array.from(activeTags).map(tag => tag.textContent.replace('×', '')).join(', ');
        techniqueOutput.textContent = activeTagsText;
        
        // Clear input
        addTechniqueInput.value = '';
    }
});


// Print Scale
document.querySelectorAll('.print-scale-btn').forEach(tag =>
    tag.addEventListener('click', () => {
        // Deactivate all other tags first
        document.querySelectorAll('.print-scale-list .tag.active').forEach(activeTag => {
            if (activeTag !== tag) {
                activeTag.classList.remove('active');
            }
        });
        
        tag.classList.toggle('active');

        // Get the active print scale tag
        const activeTag = document.querySelector('.print-scale-list .tag.active');
        const printScaleOutput = document.getElementById('print-scale-output');

        // Set output to active tag's text or empty if none active
        printScaleOutput.textContent = activeTag ? activeTag.textContent : '';
    })
);

// Add Print Scale
const addPrintScaleButton = document.getElementById('add-print-scale-button');
const addPrintScaleInput = document.getElementById('add-print-scale');
const printScaleList = document.querySelector('.print-scale-list'); 

// Helper function to create delete button
function createDeleteButton(tagElement) {
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '×';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent tag click event from firing
        tagElement.remove();
        // Update the corresponding output
        const listClass = tagElement.parentElement.className;
        let outputId;
        switch(true) {
            case listClass.includes('category-list'):
                outputId = 'category-output';
                break;
            case listClass.includes('placement-list'):
                outputId = 'placement-output';
                break;
            case listClass.includes('print-direction-list'):
                outputId = 'print-direction-output';
                break;
            case listClass.includes('technique-list'):
                outputId = 'technique-output';
                break;
            case listClass.includes('print-scale-list'):
                outputId = 'print-scale-output';
                break;
        }
        if (outputId) {
            const activeTags = tagElement.parentElement.querySelectorAll('.tag.active');
            const outputElement = document.getElementById(outputId);
            const separator = outputId === 'category-output' ? ' | ' : ', ';
            outputElement.textContent = Array.from(activeTags).map(tag => tag.textContent.replace('×', '')).join(separator);
        }
    });
    return deleteBtn;
}

addPrintScaleButton.addEventListener('click', () => {
    const newValue = addPrintScaleInput.value.trim();
    if (newValue) {
        const newPrintScale = document.createElement('li');
        newPrintScale.textContent = newValue;
        newPrintScale.classList.add('tag');
        newPrintScale.appendChild(createDeleteButton(newPrintScale));
        
        // Add click event listener to new print scale
        newPrintScale.addEventListener('click', () => {
            // Deactivate all other tags first
            document.querySelectorAll('.print-scale-list .tag.active').forEach(activeTag => {
                if (activeTag !== newPrintScale) {
                    activeTag.classList.remove('active');
                }
            });
            
            newPrintScale.classList.toggle('active');

            // Update print scale output
            const activeTag = document.querySelector('.print-scale-list .tag.active');
            const printScaleOutput = document.getElementById('print-scale-output');
            printScaleOutput.textContent = activeTag ? activeTag.textContent.replace('×', '') : '';
        });

        // Add to list
        printScaleList.appendChild(newPrintScale);
        
        // Update print scale output immediately after adding new tag
        const activeTag = document.querySelector('.print-scale-list .tag.active');
        const printScaleOutput = document.getElementById('print-scale-output');
        printScaleOutput.textContent = activeTag ? activeTag.textContent.replace('×', '') : '';

        // Clear input
        addPrintScaleInput.value = '';
        }
});


// Repeat Size
const addRepeatButton = document.getElementById('add-repeat-button');
const repeatWidthInput = document.getElementById('repeat-width');
const repeatHeightInput = document.getElementById('repeat-height');
const repeatOutput = document.getElementById('repeat-output');

// Set input type to number
repeatWidthInput.type = 'number';
repeatHeightInput.type = 'number';

// Prevent non-numeric input
[repeatWidthInput, repeatHeightInput].forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    });
    
    // Prevent paste of non-numeric values
    input.addEventListener('paste', (e) => {
        const pastedText = e.clipboardData.getData('text');
        if (!/^\d+$/.test(pastedText)) {
            e.preventDefault();
        }
    });
});

addRepeatButton.addEventListener('click', () => {
    const width = repeatWidthInput.value;
    const height = repeatHeightInput.value;
    if (width && height) {
        repeatOutput.textContent = `w ${width} X h ${height}`;
    }
});

// Clear button functionality
document.querySelectorAll('.clear-btn').forEach(button => {
    button.addEventListener('click', () => {
        const section = button.dataset.section;
        
        switch(section) {
            case 'range-month':
                document.getElementById('range-month').value = '';
                document.getElementById('range-month-output').textContent = '';
                break;
                
            case 'category':
                document.querySelectorAll('.category-list .tag').forEach(tag => {
                    tag.classList.remove('active');
                });
                document.getElementById('category-output').textContent = '';
                document.getElementById('add-category').value = '';
                break;
                
            case 'page-label':
                document.getElementById('add-page-label-1').value = '';
                document.getElementById('add-page-label-2').value = '';
                document.getElementById('page-label-output').textContent = '';
                break;
                
            case 'placement':
                document.querySelectorAll('.placement-list .tag').forEach(tag => {
                    tag.classList.remove('active');
                });
                document.getElementById('placement-output').textContent = '';
                document.getElementById('add-placement').value = '';
                break;
                
            case 'print-direction':
                document.querySelectorAll('.print-direction-list .tag').forEach(tag => {
                    tag.classList.remove('active');
                });
                document.getElementById('print-direction-output').textContent = '';
                document.getElementById('add-print-direction').value = '';
                break;
                
            case 'technique':
                document.querySelectorAll('.technique-list .tag').forEach(tag => {
                    tag.classList.remove('active');
                });
                document.getElementById('technique-output').textContent = '';
                document.getElementById('add-technique').value = '';
                break;
                
            case 'print-scale':
                document.querySelectorAll('.print-scale-list .tag').forEach(tag => {
                    tag.classList.remove('active');
                });
                document.getElementById('print-scale-output').textContent = '';
                document.getElementById('add-print-scale').value = '';
                break;
                
            case 'repeat':
                document.getElementById('repeat-width').value = '';
                document.getElementById('repeat-height').value = '';
                document.getElementById('repeat-output').textContent = '';
                break;
        }
    });
});

// Export to PDF
const exportButton = document.getElementById('export-btn');
const a3Content = document.querySelector('.a3-content');

exportButton.addEventListener('click', () => {
    console.log('Export button clicked');
    
    try {
        // Prompt user for filename
        const filename = prompt('Enter filename for your PDF:', 'spec-document.pdf');
        
        if (filename) {
            // Remove any scaling before export
            const originalScale = a3Content.style.transform;
            a3Content.style.transform = 'none';

            // Wait for images to load
            const images = a3Content.getElementsByTagName('img');
            const imagePromises = Array.from(images).map(img => {
                if (img.complete) {
                    return Promise.resolve();
                } else {
                    return new Promise(resolve => {
                        img.onload = resolve;
                        img.onerror = resolve;
                    });
                }
            });

            // Once all images are loaded, generate PDF
            Promise.all(imagePromises).then(() => {
                const opt = {
                    margin: 0,
                    filename: filename,
                    image: { type: 'jpeg', quality: 1 },
                    html2canvas: { 
                        scale: 4,
                        useCORS: true,
                        letterRendering: true,
                        width: a3Content.offsetWidth,
                        height: a3Content.offsetHeight,
                        windowWidth: a3Content.offsetWidth,
                        windowHeight: a3Content.offsetHeight,
                        allowTaint: true,
                        taintTest: false
                    },
                    jsPDF: { 
                        unit: 'mm', 
                        format: 'a3', 
                        orientation: 'portrait',
                        compress: false
                    },
                    pagebreak: { mode: 'avoid-all' }
                };

                // Generate and save PDF
                html2pdf().set(opt).from(a3Content).save().then(() => {
                    // Restore original scaling after export
                    a3Content.style.transform = originalScale;
                });
            });
        }
        
    } catch (error) {
        console.error('Error generating PDF:', error);
    }
});

// Image handling
const addImageButton = document.getElementById('add-image-button');
const imageContainer = document.getElementById('image-container');
const imageClearButton = document.querySelector('[data-section="image"]');

// Create hidden file input
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = 'image/*'; // Accept only image files
fileInput.style.display = 'none';
document.body.appendChild(fileInput);

// Handle image upload
addImageButton.addEventListener('click', () => {
    fileInput.click(); // Trigger file selection dialog
});

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            // Clear any existing images
            imageContainer.innerHTML = '';
            
            // Create and add new image
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.maxWidth = '100%';
            img.style.maxHeight = '100%';
            img.style.objectFit = 'contain';
            imageContainer.appendChild(img);
        };
        
        reader.readAsDataURL(file);
    }
});

// Handle clear button
imageClearButton.addEventListener('click', () => {
    imageContainer.innerHTML = ''; // Clear the image container
    fileInput.value = ''; // Reset the file input
});

// Export to Illustrator Script
const exportAiButton = document.getElementById('export-ai-btn');

exportAiButton.addEventListener('click', () => {
    try {
        // Prompt user for filename
        const filename = prompt('Enter filename for your Illustrator script:', 'spec-document.jsx');
        
        if (filename) {
            // Generate the Illustrator script content
            const scriptContent = generateIllustratorScript();
            
            // Create and download the .jsx file
            const blob = new Blob([scriptContent], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            link.click();
            window.URL.revokeObjectURL(url);
        }
    } catch (error) {
        console.error('Error generating Illustrator script:', error);
    }
});

// Helper function to convert CSS RGB color to Illustrator color string
function convertCssColorToRgb(cssColor) {
    const match = cssColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
        return {
            red: parseInt(match[1]),
            green: parseInt(match[2]),
            blue: parseInt(match[3])
        };
    }
    return null;
}

// Helper function to convert font family to PostScript name
function getFontPostScriptName(fontFamily) {
    const fontMap = {
        'Albert Sans': 'AlbertSans-Regular',
        'Albert Sans Thin': 'AlbertSans-Thin',
        'Albert Sans ExtraLight': 'AlbertSans-ExtraLight',
        'Albert Sans Light': 'AlbertSans-Light',
        'Albert Sans Regular': 'AlbertSans-Regular',
        'Albert Sans Medium': 'AlbertSans-Medium',
        'Albert Sans SemiBold': 'AlbertSans-SemiBold',
        'Albert Sans Bold': 'AlbertSans-Bold',
        'Albert Sans ExtraBold': 'AlbertSans-ExtraBold',
        'Albert Sans Black': 'AlbertSans-Black',
        'Albert Sans Thin Italic': 'AlbertSans-ThinItalic',
        'Albert Sans ExtraLight Italic': 'AlbertSans-ExtraLightItalic',
        'Albert Sans Light Italic': 'AlbertSans-LightItalic',
        'Albert Sans Italic': 'AlbertSans-Italic',
        'Albert Sans Medium Italic': 'AlbertSans-MediumItalic',
        'Albert Sans SemiBold Italic': 'AlbertSans-SemiBoldItalic',
        'Albert Sans Bold Italic': 'AlbertSans-BoldItalic',
        'Albert Sans ExtraBold Italic': 'AlbertSans-ExtraBoldItalic',
        'Albert Sans Black Italic': 'AlbertSans-BlackItalic'
    };
    
    return fontMap[fontFamily] || 'AlbertSans-Regular';
}

function generateIllustratorScript() {
    try {
        const MM_TO_PT = 2.83465;  // 1mm = 2.83465pt
        
        // A3 dimensions in mm
        const A3_WIDTH = 297;
        const A3_HEIGHT = 420;
        const MARGIN = 8;
        const BOX_WIDTH = 281;
        const BOX_PADDING = 2;

        // Helper function to sanitize text
        function sanitizeText(text, id) {
            if (!text) return '';
            let sanitized = text.toString()
                .replace(/[\n\r]/g, ' ')
                .replace(/"/g, '\\"')
                .replace(/[^\x20-\x7E]/g, '')
                .trim();
            
            // Only uppercase specific elements
            const uppercaseElements = [
                'range-month-output',
                'style-code-output',
                'style-code-output-2',
            ];
            
            if (uppercaseElements.includes(id)) {
                sanitized = sanitized.toUpperCase();
            }
            
            return sanitized;
        }

        // Capture all dynamic content first with error checking
        const elements = {
            'brand-name': null,
            'style-code-output': null,
            'style-code-output-2': null,
            'placement-output': null,
            'print-direction-output': null,
            'technique-output': null,
            'print-scale-output': null,
            'repeat-output': null,
            'category-output': null,
            'page-label-output': null
        };

        // Get and sanitize each element
        for (const [id, value] of Object.entries(elements)) {
            const element = document.getElementById(id);
            elements[id] = element ? sanitizeText(element.textContent, id) : '';
        }

        let script = `
// Adobe Illustrator Script
// Created by SPEC Generator

// Create a new document (A3 size)
var doc = app.documents.add(DocumentColorSpace.RGB);
doc.artboards[0].artboardRect = [0, ${A3_HEIGHT * MM_TO_PT}, ${A3_WIDTH * MM_TO_PT}, 0];

// Create layers
var mainLayer = doc.layers.add();
mainLayer.name = "SPEC Content";

// Helper function to convert mm to points
function mmToPt(mm) {
    return mm * ${MM_TO_PT};
}

// Helper function to create text with alignment
function createText(content, x, y, size, fontName, r, g, b, alignment) {
    try {
        if (!content || content === '') {
            return;
        }

        var text = mainLayer.textFrames.add();
        
        // Set the font first, before adding content
        try {
            var shouldBeBold = (
                content.indexOf("PRINT SCALE:") === 0 ||
                content === "** Please do not wait for briefing to submit strike off **" ||
                content.indexOf("COUNTRY ROAD") !== -1
            );
            
            // Use the exact PostScript names for Albert Sans
            var fontPostScriptName = shouldBeBold ? "AlbertSans-Bold" : "AlbertSans-Regular";
            text.textRange.characterAttributes.textFont = app.textFonts.getByName(fontPostScriptName);
        } catch(e) {
            // If Albert Sans fails, fall back to Arial
            try {
                text.textRange.characterAttributes.textFont = app.textFonts.getByName("ArialMT");
            } catch(e) {
                text.textRange.characterAttributes.textFont = app.textFonts[0];
            }
        }
        
        // Now set the content
        text.contents = content;
        
        // Set position
        text.position = [mmToPt(x), mmToPt(${A3_HEIGHT} - y)];
        
        // Set justification based on alignment
        if (alignment === 'center') {
            text.textRange.paragraphAttributes.justification = Justification.CENTER;
        } else if (alignment === 'right') {
            text.textRange.paragraphAttributes.justification = Justification.RIGHT;
        } else {
            text.textRange.paragraphAttributes.justification = Justification.LEFT;
        }
        
        text.textRange.size = size;
        
        if (r !== null && g !== null && b !== null) {
            var textColor = new RGBColor();
            textColor.red = r;
            textColor.green = g;
            textColor.blue = b;
            text.textRange.characterAttributes.fillColor = textColor;
        }
    } catch(e) {
        alert("Error creating text '" + content + "': " + e.toString());
    }
}

// Helper function to create rectangles
function createRectangle(x, y, width, height) {
    var rect = mainLayer.pathItems.rectangle(
        mmToPt(${A3_HEIGHT} - y),
        mmToPt(x),
        mmToPt(width),
        mmToPt(height)
    );
    
    rect.filled = false;
    rect.strokeWidth = 0.5;
    rect.strokeColor = new RGBColor();
    rect.strokeColor.red = 0;
    rect.strokeColor.green = 0;
    rect.strokeColor.blue = 0;
    
    return rect;
}

// Create border boxes
createRectangle(${MARGIN}, ${MARGIN}, ${BOX_WIDTH}, 20);
createRectangle(${MARGIN}, ${MARGIN + 22}, ${BOX_WIDTH}, 20);


// Header box content - left side
// Creates text element for the brand name:
// - elements['brand-name']: The brand name text content
// - MARGIN + BOX_PADDING: X position (distance from left edge in mm)
// - MARGIN + 2: Y position (2mm down from the top margin)
// - 12: Font size in points
// - "AlbertSans-Regular": Font family to use
// - 0, 0, 0: RGB color values (black)
// - 'left': Text alignment

createText("${elements['brand-name']}", ${MARGIN + BOX_PADDING}, ${MARGIN + 2}, 12, "AlbertSans-Bold", 0, 0, 0, 'left');


// Creates text element for the primary style code:
// - elements['style-code-output']: The style code text
// - MARGIN + BOX_PADDING: Same X position as brand name
// - MARGIN + 8: Y position (8mm down from top margin)
// - Other parameters same as above

createText("${elements['style-code-output']}", ${MARGIN + BOX_PADDING}, ${MARGIN + 8}, 12, "AlbertSans-Regular", 0, 0, 0, 'left');


// Creates text element for the secondary style code (if any):
// - elements['style-code-output-2']: The secondary style code text
// - MARGIN + BOX_PADDING: Same X position as above
// - MARGIN + 14: Y position (14mm down from top margin)
// - Other parameters same as above

createText("${elements['style-code-output-2']}", ${MARGIN + BOX_PADDING}, ${MARGIN + 14}, 12, "AlbertSans-Regular", 0, 0, 0, 'left');

// Header box content - right side
createText("${elements['category-output']}", ${MARGIN + BOX_WIDTH - BOX_PADDING}, ${MARGIN + 2}, 12, "AlbertSans-Regular", 0, 0, 0, 'right');
createText("PAGE ${elements['page-label-output']}", ${MARGIN + BOX_WIDTH - BOX_PADDING}, ${MARGIN + 8}, 12, "AlbertSans-Regular", 0, 0, 0, 'right');

// Sub-header box content - left side
createText("PLACEMENT: ${elements['placement-output']}", ${MARGIN + BOX_PADDING}, ${MARGIN + 24}, 12, "AlbertSans-Regular", 0, 0, 0, 'left');
createText("TECHNIQUE: ${elements['technique-output']}", ${MARGIN + BOX_PADDING}, ${MARGIN + 30}, 12, "AlbertSans-Regular", 0, 0, 0, 'left');

// Sub-header box content - right side
createText("PRINT DIRECTION: ${elements['print-direction-output']}", ${MARGIN + BOX_WIDTH - BOX_PADDING}, ${MARGIN + 24}, 12, "AlbertSans-Regular", 0, 0, 0, 'right');
createText("** Please do not wait for briefing to submit strike off **", ${MARGIN + BOX_WIDTH - BOX_PADDING}, ${MARGIN + 30}, 12, "AlbertSans-Regular", 255, 0, 0, 'right');

// Centered text below boxes (both position and text alignment should be centered)
createText("PRINT SCALE: ${elements['print-scale-output']}", ${MARGIN + BOX_WIDTH/2}, ${MARGIN + 45}, 12, "AlbertSans-Bold", 255, 0, 0, 'center');
createText("REPEAT SIZE: ${elements['repeat-output']}", ${MARGIN + BOX_WIDTH/2}, ${MARGIN + 51}, 12, "AlbertSans-Regular", 0, 0, 0, 'center');
`;

        return script;
    } catch (error) {
        alert('Error in generateIllustratorScript: ' + error);
        throw error;
    }
}

// Debug: List available fonts
var availableFonts = [];
for (var i = 0; i < app.textFonts.length; i++) {
    availableFonts.push(app.textFonts[i].name);
}
alert("Available fonts: " + availableFonts.join("\n"));

