const useRegexp = (): Record<string, RegExp> => {
    const onlyLetters: RegExp = /^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻäöüßÄÖÜ-]+(?: [A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻäöüßÄÖÜ-]+)*$/
    const httpsUrlRegexp: RegExp = /^https:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/;

    return {
        onlyLetters,
        httpsUrlRegexp
    }
}

export default useRegexp
