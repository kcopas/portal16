
# About translations

* [Getting started](#getting-started)
* [How does it work and why Crowdin](#how-does-it-work-and-why-crowdin)
* [What to translate (priorities)](#what-to-translate)
* [Context of the translations](#scontext-of-the-translations)
* [Variables, pluralizations and Markdown](#variables-pluralizations-and-markdown)
* [Issues](#issues)
* [When does it show on GBIF.org](#when-does-it-show-on-gbiforg)
* [Screenshots of the absolute basics](#screenshots-of-the-absolute-basics)


## Getting started

Translations of the user interface on GBIF.org are done using the website [Crowdin](https://crowdin.com/) - so you need an account for that.

1. Have you received an invitation email with a link?
    * Yes: Then simply follow the link and login/create account.
    * No: go to the [GBIF.org project](https://crowdin.com/project/gbif-portal). Select the language you would like to translate. Press `Join`. We will then add you to the translator team.
2. Start translating. It is fairly intuitive to get started (see [screenshots](#screenshots-of-the-absolute-basics)), but there is also a [detailed 41-minute video](https://www.youtube.com/watch?v=bxdC7MfrO7A) that goes into many of the features of the product that you can see if you are curious to optimize your process.

## How does it work and why Crowdin
All translations are located in files that could look like this:
```
{
  "filterNames": {
    "month": "Month",
    "catalogNumber": "Catalog number",
    "year": "Year",
    "country": "Country or area",
    "taxonKey": "Scientific name"
  }
}
```

In theory you could just upload a file with translated strings. In danish that would look like:
```
{
  "filterNames": {
    "month": "Måned",
    "catalogNumber": "Katalognummer",
    "year": "År",
    "country": "Land eller område",
    "taxonKey": "Videnskabeligt navn"
  }
}
```

But because it is easy to make mistakes we use a translation tool called Crowdin. That also helps with proof reading and gives automates suggestions as well as having other benefits.

## What to translate

> A 45% translated site might still appear like being 95% done. Choose the parts that matter most to your audience.

It is of course best if everything is translated, but it is possible to only translate parts of the site, but in some cases it will mean that two adjacent words will be in different languages.

We suggest that you start with:

### Components
1) menu, homepage, profile, feedback, terms, footer, healthSummary
2) search, speciesSearch, datasetSearch, occurrenceSearch, publisherSearch, pagination, counts, filters, filterNames, intervals, downloadReport, phrases (+ related enums)
3) species, [occurrenceKey, occurrenceFieldNames], dataset, [resource, cms] (+ related enums)
4) metrics, map, galleryBar, downloads
5) publisher, [participant, country] (+ related enums),
6) the remaining ...

### Enums
Some enums are used a lot, and others rarely. Translating the ones realted to the components you translate makes best sense. So if you are translating the dataset component, you probably want to translate the datasetType enumerations as well.

List of country names and language names with their corresponding iso codes can often be found online. If you have such a list, let us know, then we can transform it into a translation file and upload it to Crowdin.

## Context of the translations
In some cases you need to know how it is used to translate a term or a sentence pproperly into your target language. E.g. does `more` mean `more (images)` or `more (information)`. In cases where you do not know how to translate it because you are missing context, you need to do some investigaion. Here are suggestions

* file name: the translations are split into multiple files names after the components on the website they refer to. `dataset.json` will of course have translations related to the dataset page. So if you are translating something and are unsure what it refers to, then go to a dataset page, you will likely be able to guess it from there.
* Key name: e.g. the string to translate might be `See gallery` but you can see from the context (located just below the string to translate) that it is named `galleryBar -> seeAllImages`. This tells you that it referes to images and you might decide that gallery sounds unnatural and instead choose to translate it `see all` or `more images`.
* Or ask for more context.

## Variables, pluralizations and Markdown
Most translations strings is simply english text, but some of them is more complex and have characters with special meaning. Some of them should not be translated and others should be changed and added to.

**Markdown**

Example: `By signing in you accept GBIFs [terms](/terms) and [privacy policy](/terms/privacy-policy).`

Markdown is a simple way to write HTML (the format used to define links, headlines, and regular text). Instead of writing `<h1>Headline</h1>`, one can write `#Headline`. In cases where the translation includes e.g. a link Markdown is used. To properly translate Markdown, you need to know what to translate and what to leave as it is. Read more [about markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) and [try writing something](https://dillinger.io/) to get a feel for it. In above example `[terms](/terms)` would become a link with the text `terms` and would link to the page `gbif.org/terms` 

**Variables**

Example: `Sign up with {PROVIDER}`

Sometimes we need to replace a single word in a sentence. For example: `Welcome back {USER_FIRST_NAME}` could become `Welcome back Charles`. Variables are demarked by curly brackets `{}` and should not be translated. So the danish translation would be `Velkommen tilbage {USER_FIRST_NAME}`. It is fine to move the variable somewhere else if your translation require it. E.g. `{USER_FIRST_NAME}, back you are.`

**Plurals**

Example: `{NUMBER_FORMATED} {NUMBER, select, 1{occurrence} other{occurrences}}`

In english you would say `0 occurrenceS, 1 occurrence, 2 occurrenceS`. Other languages pluralize differently and might have more forms. [Message format](https://messageformat.github.io/messageformat/page-guide) is used for pluralization.  And looks like this `{NUMBER_FORMATED} {NUMBER, select, 0{occurrences} 1{occurrence} other{occurrences}}`. In this translation string we see 2 variables: `{NUMBER_FORMATED}` and `NUMBER`. But there is also some markup that defines what to write depending on the value of `NUMBER`. The numeric input is mapped to a plural category, some subset of zero, one, two, few, many, and other depending on the locale and the type of plural. 

* zero: This category is used for languages that have grammar specialized specifically for zero number of items. (Examples are Arabic and Latvian.)
* one: This category is used for languages that have grammar specialized specifically for one item. Many languages, but not all, use this plural category. (Many popular Asian languages, such as Chinese and Japanese, do not use this category.)
* two: This category is used for languages that have grammar specialized specifically for two items. (Examples are Arabic and Welsh.)
* few: This category is used for languages that have grammar specialized specifically for a small number of items. For some languages this is used for 2-4 items, for some 3-10 items, and other languages have even more complex rules.
* many: This category is used for languages that have grammar specialized specifically for a larger number of items. (Examples are Arabic, Polish, and Russian.)
* other: This category is used if the value doesn't match one of the other plural categories. Note that this is used for "plural" for languages (such as English) that have a simple "singular" versus "plural" dichotomy.

## Issues
Are you hitting issues then let us know. We are still figuring out how to do this best. Examples of issues we expect to see in the first translations are:

* Things in the interface that are not included in the translation files.
* Places where the context is missing, so it is difficult to provide a good translation.
* The same translated term being used multiple places, but where it would make better sense to split it into 2 translations for your language. For example the english term `more` would in danish be translated to `mere`or `flere` dependent on what it is more.
* ...

You can contact us by mail, through [Github issues](https://github.com/gbif/portal16) or by commenting on the translation keys directly in Crowdin.

## When does it show on GBIF.org
Translations are not immediately available on the website. The flow is: 
1. Translations are done in Crowdin. 
2. Crowdin send the changes. 
3. We at the secretariat accept them.
4. A new version of the website is deployed.

During translations of a new language the language will only be available in our UAT (User agreement testing) environment at [gbif-uat.org](https://www.gbif-uat.org) - once we agree that a translation has progressed enough to go live it will be available at the production website gbif.org.

**About UAT**

Your user accounts and passwords on [gbif-uat.org](https://www.gbif-uat.org) are not the same as on gbif.org. You will have to create a seperate account for the testing environment (you can reuse your email and username).

## Screenshots of the absolute basics

![Select a language](./img/select_language.png?raw=true)
![Select a file](./img/select_file.png?raw=true)
![Select when translating](./img/translation_interface.jpg?raw=true)
![variables](./img/variables.png?raw=true)
![plurals](./img/plurals.png?raw=true)



