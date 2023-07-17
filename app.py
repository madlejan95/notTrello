from flask import Flask, render_template
from flask import request

app = Flask(__name__)




@app.route("/")
def hello_world():
    return "<p>Calkulacka v pythonu flasku kamo!</p> \
           <form action=\"/calculate\"> \
  <label for=\"fname\">Zadej MD rate v CZK kamo:</label><br> \
  <input type=\"text\" name=\"md_rate\" value=\"8000\"><br> \
  <label for=\"lname\">Pocet dnu v roce co planujes pracovat:</label><br> \
  <input type=\"text\" name=\"num_of_days\" value=\"230\"><br><br> \
  <input type=\"submit\" value=\"Submit\"> \
</form> "


@app.route('/calculate', methods=['GET'])
def calculate():
    md_rate = int(request.args.get('md_rate', ''))
    num_of_days = int(request.args.get('num_of_days', ''))
    income = float(md_rate * num_of_days)
    expenses = min(float(1200000), float(income * 0.6))
    taxable_income = income - expenses
    tax_base = 0.55 * taxable_income
    social_tax = min(tax_base, 1920000) * 0.292
    health_tax = tax_base * 0.135
    income_tax = taxable_income * 0.15 - 30840
    mil_tax = max(0.0, (taxable_income - 1440000) * 0.08)
    net_income = income - social_tax - health_tax - income_tax - mil_tax
    effective_tax = (income - net_income) / (income / 100)

    tax_base = format_number(tax_base)
    taxable_income = format_number(taxable_income)
    income = format_number(income)
    expenses = format_number(expenses)
    social_tax = format_number(social_tax)
    health_tax = format_number(health_tax)
    income_tax = format_number(income_tax)
    mil_tax = format_number(mil_tax)
    net_income = format_number(net_income)

    print(f"Za den si vydelas: {md_rate}")
    print(f"Pocet dnu: {num_of_days}")
    return render_template('calculation.html', md_rate=md_rate, num_of_days=num_of_days, income=income,
                           expenses=expenses, taxable_income=taxable_income, tax_base=tax_base, social_tax=social_tax,
                           health_tax=health_tax, income_tax=income_tax, mil_tax=mil_tax, net_income=net_income,
                           effective_tax=effective_tax)


def format_number(number):
    return f'{number:,}'.replace(',', ' ')


if __name__ == '__main__':
    app.run(debug=True, port=3001)