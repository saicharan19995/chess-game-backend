def number_to_words(num):

    if num < 1 or num > 999999:
        raise ValueError("Invalid Number")

    below_twenty = [
        "", "one", "two", "three", "four", "five", "six", "seven", "eight","nine",
        "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen",
        "eighteen", "nineteen"
    ]


    tens = [
        "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"
    ]


    def convert_bellow_thousands(n):
        if n == 0:
            return ""
        elif n < 20:
            return below_twenty[n]
        elif n < 100:
            # 99 -> ninety nine
            # flor(n / 10) - > 9.9 -> 9
            ten_part = tens[n // 10]
            unit_part = below_twenty[n % 10]
            return ten_part + (" " + unit_part if unit_part else "")
        else:
            # 141 -> one hundred forty one
            # n // 100 -> 1 -> ?
            # n % 100 -> 41
            hundered_part = below_twenty[n // 100] + " hundred"
            rest = convert_bellow_thousands(n % 100)
            return hundered_part + (" " + rest if rest else "")

    
    def convert(num):
        if num == 0:
            return "zero"
        
        result = ""
        thousand_part = num // 1000
        hundred_part = num % 1000

        if thousand_part > 0:
            result += convert_bellow_thousands(thousand_part) + " thousand"
        
        if hundred_part > 0:
            result += (" " if result else "") + convert_bellow_thousands(hundred_part)

        return result
    
    return convert(num)


print(number_to_words(1))
print(number_to_words(99))
print(number_to_words(123))
print(number_to_words(1001))
print(number_to_words(627185))

for i in range(1, 999999 + 1):
    print(number_to_words(i))