const useRegexp = (): Record<string, RegExp> => {
    const onlyLetters: RegExp = /^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻäöüßÄÖÜ-]+(?: [A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻäöüßÄÖÜ-]+)*$/


    return {
        onlyLetters,
    }
}

export default useRegexp
