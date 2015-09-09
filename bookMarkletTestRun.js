GroupingCriteria = function (ruleList){
    
    this.rules = Array.from(ruleList).filter((element) => element.type == 1);
    this.weight = 1;
    
    this.resultList = this.rules.map((currentValue) => 
        new Result(currentValue, calculateRule(currentValue, this.weight)));
    
    function calculateRule(rule, weight){
        return (rule.selectorText.split(',').length - 1) * weight;
    }
};

RareSelectorsCriteria = function (ruleList){
    
    this.pattern = /(\[{1}.*=.*\]{1})|(>|~|\+)/g;
    this.rules = Array.from(ruleList).filter((element) => element.type == 1);
    this.weight = 3;
    
    this.resultList = this.rules.map((currentValue) => 
        new Result(currentValue, calculateRule(currentValue, this.weight, this.pattern)));
    
    function calculateRule(rule, weight, pattern){
        var count = 0;
        while ((m = pattern.exec(rule.selectorText)) !== null) {
            if (m.index === pattern.lastIndex) {
                count++;
                pattern.lastIndex++;
            }
        }
        return count*weight
    }
};

SimplifiedPropertiesCriteria = function (ruleList){
    
};

SelectorSizeCriteria = function (ruleList){
    
};

PseudoElementsCriteria = function (ruleList) {
    // body...
};

AtRulesCriteria = function (ruleList) {
    // body...
};

MediaQueriesCriteria = function (ruleList) {
    // body...
};

PrefixCriteria = function (ruleList) {
    // body...
};

NotSufixCriteria = function (ruleList) {
    // body...
};

SelectorComplexityCriteria = function (ruleList) {
    // body...
};

LocationSelectorCriteria = function (ruleList) {
    
};

StyleSheetLengthCriteria = function (ruleList) {
    // body...
};

var Result = function(cssRule, score){
    this.cssRule = cssRule;
    this.score = score;
    this.htmlMatches = () => this.cssRule.selectorText;
};

var myStyleSheet = function(styleSheet){
    this.styleSheet = styleSheet;
    this.criteriaList = [];
    this.criteriaList.push(styleSheet.cssRules ? new GroupingCriteria(styleSheet.cssRules):null);
    this.criteriaList.push(styleSheet.cssRules ? new RareSelectorsCriteria(styleSheet.cssRules):null);
};

() => {
    var arr = Array.from(document.styleSheets);

    var myStyleSheetList = arr.map((currentValue) => new myStyleSheet(currentValue));

    console.log(myStyleSheetList);
}();