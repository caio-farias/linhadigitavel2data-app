import { roundUpTensDigit, sumDigits } from '../digitsOperations.util'

export const DVCalculation = (
	digitsLine: string,
	customModMapping: (remainderSumMod: number, mod: number) => string = null,
	shouldLimitSum = true,
	mod = 10
): string => {
	const mod10FactorSequence = [2, 1]
	const mod11FactorSequence = [2, 3, 4, 5, 6, 7, 8, 9]
	const factorSequence = mod === 10 ? mod10FactorSequence : mod11FactorSequence
	const digitsSum = sumDigits(digitsLine, factorSequence, shouldLimitSum)
	const digitsSumMod = digitsSum % mod
	if (customModMapping != null) return customModMapping(digitsSumMod, mod)
	return (mod - digitsSumMod).toString()
}

export const digitsLine47FieldsDVCalc = (digitsLine: string, mod = 10): string => {
	const onlyMainFields = digitsLine.slice(0, 30)

	const firstField = onlyMainFields.slice(0, 9)
	const secondField = onlyMainFields.slice(10, 20)
	const thirdField = onlyMainFields.slice(19, 29)

	const firstFieldSum = sumDigits(firstField)
	const secondFieldSum = sumDigits(secondField)
	const thirdFieldSum = sumDigits(thirdField)

	const modFirstField = firstFieldSum % mod
	const modSecondField = secondFieldSum % mod
	const modThirdField = thirdFieldSum % mod

	const roundedUpfirstFieldSum = roundUpTensDigit(firstFieldSum)
	const roundedUpsecondFieldSum = roundUpTensDigit(secondFieldSum)
	const roundedUpthirdFieldSum = roundUpTensDigit(thirdFieldSum)

	const firstFieldDV = (roundedUpfirstFieldSum - modFirstField) % mod
	const secondFieldDV = (roundedUpsecondFieldSum - modSecondField) % mod
	const thirdFieldDV = (roundedUpthirdFieldSum - modThirdField) % mod

	return `${firstFieldDV}${secondFieldDV}${thirdFieldDV}`
}

export const digitsLine48FieldsDVCalc = (
	digitsLine: string,
	customMapping: (remainderSumMod: number, mod: number) => string = null,
	mod = 10
): string => {
	const firstField = digitsLine.slice(0, 11)
	const secondField = digitsLine.slice(12, 23)
	const thirdField = digitsLine.slice(24, 35)
	const forthField = digitsLine.slice(36, 47)

	const firstFieldDV = DVCalculation(firstField, customMapping, true, mod)
	const secondFieldDV = DVCalculation(secondField, customMapping, true, mod)
	const thirdFieldDV = DVCalculation(thirdField, customMapping, true, mod)
	const forthFieldDV = DVCalculation(forthField, customMapping, true, mod)

	return `${firstFieldDV}${secondFieldDV}${thirdFieldDV}${forthFieldDV}`
}
