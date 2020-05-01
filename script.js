$(document).ready(function(){    
    var highScoreList = checkForHighScore();

    var currentScore = 0;

    var currentQuestion = 0;

    var timer = 0;

    var questions = [
        {
            question: "What is a function?",
            answers: ["a party", "a place where fun trains gather", "a CLOSED ENVIROMENT", "math baybee"],
            correct: 2
        },
        {
            question: " ______ tag is an extension to HTML that can enclose any number of JavaScript statements.",
            answers: ["SCRIPT", "BODY", "HEAD", "TITLE"],
            correct: 0
        },
        {
            question: "Which of the following best describes JavaScript?",
            answers: ["a low-level programming language.", "a scripting language precompiled in the browser.", "a compiled scripting language.", "an object-oriented scripting language."],
            correct: 3
        },
        {
            question: "Which of the following is not considered a JavaScript operator?",
            answers: ["new", "this", "delete", "typeof"],
            correct: 1
        },
        {
            question: " ______method evaluates a string of JavaScript code in the context of the specified object.",
            answers: ["Eval", "ParseInt", "ParseFloat", "Efloat"],
            correct: 0
        },
        {
            question: "JavaScript is interpreted by _________",
            answers: ["Client", "Server", "Object", "none of the above"],
            correct: 0
        },
        {
            question: "The _______ method of an Array object adds and/or removes elements from an array.",
            answers: ["Reverse", "Shift", "Slice", "Splice"],
            correct: 3
        },
        {
            question: "What are variables used for in JavaScript Programs?",
            answers: ["Storing numbers, dates, or other values", "Varying randomly", "Causing high-school algebra flashbacks", "None of the above"],
            correct: 0
        },
        {
            question: 'What is the correct JavaScript syntax to write "Hello World"?',
            answers: ['"System.out.println("Hello World")"', '"println ("Hello World")"', '"document.write("Hello World")"', '"response.write("Hello World")"'],
            correct: 2
        },
        {
            question: 'What is the correct syntax for referring to an external script called " abc.js"?',
            answers: ['"script href=" abc.js', '"script name=" abc.js"', 'script src=" abc.js"', 'None of the above'],
            correct: 2
        }    
    ];



    function startQuiz(){
        currentQuestion = 0;
        currentScore = 0;
        $('#mainDisplay').empty();
        $('#mainDisplay').append(`
            <div id="timeDisplay">
                <div class="row justify-content-end timer">
                    <h3>time remaining <span id="time"></span></h3>
                </div>
            </div>
            <div class="container-fluid" id="questionDisplay">
            </div>
        `);
        startTimer(180, $('#time'));
        writeQuestion();
    }



    function startTimer(duration, display) {
        if (!isNaN(duration)) {
            timer = duration;
            var interVal=  setInterval(function () {
                var minutes = parseInt(timer / 60, 10);
                var seconds = parseInt(timer % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                $(display).html( minutes + ":" + seconds );
                if (--timer < 0) {
                    timer = duration;
                    $('#time').empty();
                    clearInterval(interVal);
                    finalScore();
                }
            },1000);
        }
    }



    function writeQuestion(){
        $('#questionDisplay').empty();
        $('#questionDisplay').append(`
            <div class="row justify-content-center">
                <h1>Question ${currentQuestion+1}</h1>
            </div>
            <div class="row">
                <h2>${questions[currentQuestion].question}</h2>
            </div>
            <br>
            <div class="row">
                <button type="button" class="btn btn-secondary text-light btn-lg" id="answerZero">${questions[currentQuestion].answers[0]}</button>
            </div>
            <br>
            <div class="row">
                <button type="button" class="btn btn-secondary text-light btn-lg" id="answerOne">${questions[currentQuestion].answers[1]}</button>
            </div>
            <br>
            <div class="row">    
                <button type="button" class="btn btn-secondary text-light btn-lg" id="answerTwo">${questions[currentQuestion].answers[2]}</button>
            </div>
            <br>
            <div class="row">    
                <button type="button" class="btn btn-secondary text-light btn-lg" id="answerThree">${questions[currentQuestion].answers[3]}</button>
            </div>
        `);
    }



    function nextQuestion(){
        currentQuestion = currentQuestion + 1;
        writeQuestion();
    }



    function evaluateAnswer(index, button){
        if ( $(button).hasClass('disabled')) {
            console.log('disabled');
        } else {
            if (currentQuestion < 9){
                disableAndCheck(index, button);
                setTimeout(function() {
                    nextQuestion();   
                } , 2000);
            } else {
                disableAndCheck(index, button);
                setTimeout(function() {
                    finalScore();
                } , 2000);     
            }
        }
    }



    function disableAndCheck(index, button){
        $('#questionDisplay button').addClass('disabled');
                if (questions[currentQuestion].correct === index ){
                    correctAnswer(button);
                } else {
                    wrongAnswer(button);
                }
    }



    function correctAnswer(button){
        $(button).removeClass( "btn-secondary" );
        $(button).addClass( "btn-success" );
        currentScore = currentScore + 1;
    }



    function wrongAnswer(button){
        $(button).removeClass( "btn-secondary" );
        $(button).addClass( "btn-danger" );
        timer -= 20; //for future reference same as timer = timer - 20;
    }



    function finalScore(){
        $('#mainDisplay').empty();   
        $('#mainDisplay').append(`
            <div id="finalScoreDisplay">
                <div class="row justify-content-center">
                    <h1>Quiz Complete!</h1>
                </div>
                <div class="row justify-content-center">
                    <h2>your score is: ${currentScore}</h2>
                </div>
                <div class="row justify-content-center">
                    <h4>Submit your score!</h4>
                </div>
                <div class="row justify-content-center">
                    <div class="form-group">
                        <input type="name" class="form-control" id="userInitials" placeholder="Input your initials">
                    </div> 
                    <input class="btn btn-secondary h-75" id="submitCurrentScore" type="submit" value="Submit">
                </div>
            </div>
        `);
    }



    function submitHighScore(){
        checkForHighScore();
        var initials = $('#userInitials').val();
        var scoreArray = [ initials, currentScore ];
        highScoreList.push(scoreArray);
        highScoreList = highScoreList.sort(function(a,b){
            return b[1] - a[1];
        });
        localStorage.setItem("highScoreList" , JSON.stringify(highScoreList));
    }



    function writeHighScore(){
        $('#mainDisplay').empty();
        $('#mainDisplay').append(`
            <div id="highScoreDisplay">
                <div class="row justify-content-center">
                    <h1>High Scores</h1>
                </div>
            </div>
        `);
        for ( var i = 0; i < highScoreList.length; i++ ){
            $('#highScoreDisplay').append(`
                <div class="row justify-content-center">
                    <div class="alert alert-secondary" role="alert">
                        ${highScoreList[i][0]} - ${highScoreList[i][1]}
                    </div>
                </div>
            `);
        }
            
    }



    function checkForHighScore(){
        if ( highScoreList === null) {
            highScoreList = [];
        } else {
            highScoreList = JSON.parse(localStorage.getItem("highScoreList"));
        }
    }



    function writeRules(){
        $('#mainDisplay').empty();
        $('#mainDisplay').append(`
            <div id="rulesDisplay">
                <div class="row justify-content-center">
                    <h1>The Rules</h1>
                </div>
                <div class="row justify-content-center">
                    <div class="col-8">
                        <h4> 10 questions</h4>
                        <br>
                        <h4> 3:00 minutes </h4>
                        <br>
                        <h4> get a question wrong, you lose 0:20</h4>
                        <br>
                        <h4> quiz is over when you run out of time or answer all questions</h4>
                    </div>
                </div>
            </div>
        `);
    }



    $('#startQuiz').on('click', function() {
        startQuiz();
    });

    $('#resetQuiz').on('click', function() {
        startQuiz();
    });

    $('#highScorePage').on('click', function() {
        checkForHighScore();
        writeHighScore();
    });

    $('#rulesPage').on('click', function() {
        writeRules();
    });

    $('#mainDisplay').delegate('#answerZero', 'click', function() {
        evaluateAnswer(0, this);
    });

    $('#mainDisplay').delegate('#answerOne', 'click', function() {
        evaluateAnswer(1, this);
    });
    
    $('#mainDisplay').delegate('#answerTwo', 'click', function() {
        evaluateAnswer(2, this);
    });
    
    $('#mainDisplay').delegate('#answerThree', 'click', function() {
        evaluateAnswer(3, this);
    });

    $('#mainDisplay').delegate('#submitCurrentScore', 'click', function() {
        checkForHighScore();
        submitHighScore();
        writeHighScore();
    });

});