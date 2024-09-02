let credits = [];

function addCredits() {
    const type = document.getElementById('type').value;
    const grade = document.getElementById('grade').value;
    const level = document.getElementById('level').value;
    const creditValue = parseInt(document.getElementById('credits').value);
    
    if (creditValue <= 0 || isNaN(creditValue)) {
        alert('Please enter a valid number of credits.');
        return;
    }

    credits.push({ type, grade, level, creditValue });
    updateCreditList();
}

function updateCreditList() {
    const creditList = document.getElementById('creditList');
    creditList.innerHTML = '';

    credits.forEach(credit => {
        const li = document.createElement('li');
        li.textContent = `${credit.creditValue} credits - Type: ${credit.type}, Grade: ${credit.grade}, Level: ${credit.level}`;
        creditList.appendChild(li);
    });
}

function calculateResults() {
    const results = document.getElementById('results');
    
    let totalCredits = { 1: 0, 2: 0, 3: 0 };
    let literacyCredits = { 1: 0, 2: 0, 3: 0 };
    let numeracyCredits = { 1: 0, 2: 0, 3: 0 };
    let subjectCredits = { 1: 0, 2: 0, 3: 0 };
    let achievedCredits = { 1: 0, 2: 0, 3: 0 };
    let meritCredits = { 1: 0, 2: 0, 3: 0 };
    let excellenceCredits = { 1: 0, 2: 0, 3: 0 };

    credits.forEach(credit => {
        totalCredits[credit.level] += credit.creditValue;

        if (credit.type === 'literacy') {
            literacyCredits[credit.level] += credit.creditValue;
        } else if (credit.type === 'numeracy') {
            numeracyCredits[credit.level] += credit.creditValue;
        } else {
            subjectCredits[credit.level] += credit.creditValue;
        }

        if (credit.grade === 'achieved') {
            achievedCredits[credit.level] += credit.creditValue;
        } else if (credit.grade === 'merit') {
            meritCredits[credit.level] += credit.creditValue;
        } else if (credit.grade === 'excellence') {
            excellenceCredits[credit.level] += credit.creditValue;
        }
    });

    let uePass = totalCredits[3] >= 42 &&
        literacyCredits[3] >= 10 &&
        numeracyCredits[3] >= 10;

    let yearPass = {
        1: totalCredits[1] >= 80,
        2: totalCredits[2] >= 80,
        3: totalCredits[3] >= 80
    };

    let endorsements = {
        merit: {
            1: achievedCredits[1] + meritCredits[1] >= 50,
            2: achievedCredits[2] + meritCredits[2] >= 50,
            3: achievedCredits[3] + meritCredits[3] >= 50
        },
        excellence: {
            1: excellenceCredits[1] >= 50,
            2: excellenceCredits[2] >= 50,
            3: excellenceCredits[3] >= 50
        }
    };

    results.innerHTML = `
        <h2>Results</h2>
        <p><strong>University Entrance:</strong> ${uePass ? 'Yes' : 'No'}</p>
        <p><strong>Year Pass:</strong></p>
        <ul>
            <li>Level 1: ${yearPass[1] ? 'Yes' : 'No'}</li>
            <li>Level 2: ${yearPass[2] ? 'Yes' : 'No'}</li>
            <li>Level 3: ${yearPass[3] ? 'Yes' : 'No'}</li>
        </ul>
        <p><strong>Endorsements:</strong></p>
        <ul>
            <li>Merit Level 1: ${endorsements.merit[1] ? 'Yes' : 'No'}</li>
            <li>Merit Level 2: ${endorsements.merit[2] ? 'Yes' : 'No'}</li>
            <li>Merit Level 3: ${endorsements.merit[3] ? 'Yes' : 'No'}</li>
            <li>Excellence Level 1: ${endorsements.excellence[1] ? 'Yes' : 'No'}</li>
            <li>Excellence Level 2: ${endorsements.excellence[2] ? 'Yes' : 'No'}</li>
            <li>Excellence Level 3: ${endorsements.excellence[3] ? 'Yes' : 'No'}</li>
        </ul>
    `;
}
