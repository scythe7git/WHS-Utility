document.addEventListener('DOMContentLoaded', function() {
    // Grade Calculator functionality
    const creditList = document.getElementById('creditList');
    const resultElement = document.getElementById('result');

    function addCredit() {
        const level = document.getElementById('level').value;
        const type = document.getElementById('type').value;
        const grade = document.getElementById('grade').value;
        const amount = parseInt(document.getElementById('amount').value);

        if (amount <= 0) return;

        const listItem = document.createElement('li');
        listItem.textContent = `${amount} credits - Level ${level}, ${type}, ${grade}`;
        creditList.appendChild(listItem);

        // Reset input fields
        document.getElementById('level').value = '1';
        document.getElementById('type').value = 'normal';
        document.getElementById('grade').value = 'achieved';
        document.getElementById('amount').value = '1';
    }

    function calculate() {
        const level = document.getElementById('level').value;
        const creditItems = creditList.getElementsByTagName('li');
        
        let totalCredits = {
            level1: { normal: 0, literacy: 0, numeracy: 0 },
            level2: { normal: 0, literacy: 0, numeracy: 0 },
            level3: { normal: 0, literacy: 0, numeracy: 0 }
        };

        for (let item of creditItems) {
            const text = item.textContent;
            const matches = text.match(/(\d+) credits - Level (\d+), (\w+), (\w+)/);
            if (matches) {
                const amount = parseInt(matches[1]);
                const levelKey = `level${matches[2]}`;
                const type = matches[3];
                totalCredits[levelKey][type] += amount;
            }
        }

        const levelData = {
            level1: { total: totalCredits.level1.normal + totalCredits.level1.literacy + totalCredits.level1.numeracy, required: { normal: 10, literacy: 5, numeracy: 5 } },
            level2: { total: totalCredits.level2.normal + totalCredits.level2.literacy + totalCredits.level2.numeracy, required: { normal: 10, literacy: 5, numeracy: 5 } },
            level3: { total: totalCredits.level3.normal + totalCredits.level3.literacy + totalCredits.level3.numeracy, required: { normal: 10, literacy: 5, numeracy: 5 } }
        };

        let result = '';

        if (level === '1') {
            result += calculateLevel(levelData.level1, totalCredits.level1);
        } else if (level === '2') {
            result += calculateLevel(levelData.level2, totalCredits.level2);
        } else if (level === '3') {
            result += calculateLevel(levelData.level3, totalCredits.level3);
        }

        resultElement.innerText = result || "You are not eligible for the selected level.";
    }

    function calculateLevel(levelData, totalCredits) {
        let result = '';
        if (totalCredits.normal < levelData.required.normal) {
            result += `You need ${levelData.required.normal - totalCredits.normal} more normal credits for Level ${level}. `;
        }
        if (totalCredits.literacy < levelData.required.literacy) {
            result += `You need ${levelData.required.literacy - totalCredits.literacy} more literacy credits for Level ${level}. `;
        }
        if (totalCredits.numeracy < levelData.required.numeracy) {
            result += `You need ${levelData.required.numeracy - totalCredits.numeracy} more numeracy credits for Level ${level}. `;
        }
        if (totalCredits.normal >= levelData.required.normal &&
            totalCredits.literacy >= levelData.required.literacy &&
            totalCredits.numeracy >= levelData.required.numeracy) {
            result += `Congratulations! You have met the requirements for Level ${level}.`;
        }
        return result;
    }

    // Attach functions to global window object for HTML event handlers
    window.addCredit = addCredit;
    window.calculate = calculate;

    // Countdown functionality (if needed)
    function updateCountdown() {
        const countdownElement = document.getElementById('countdown');
        if (countdownElement) {
            // Countdown logic here
        } else {
            console.error('Countdown element not found.');
        }
    }

    // Example placeholder function call
    // updateCountdown(); // Uncomment this line if you have a countdown element and logic
});
