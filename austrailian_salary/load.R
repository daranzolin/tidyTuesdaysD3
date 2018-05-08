library(tidyverse)

salaries <- read.csv("data/week4_australian_salary.csv")

ggplot(salaries %>% filter(average_taxable_income < 200000), 
       aes(average_taxable_income, fill = gender)) +
  geom_density(alpha = 0.5) +
  scale_x_continuous(name = "Taxable Income", labels = scales::comma) +
  hrbrthemes::theme_ipsum()