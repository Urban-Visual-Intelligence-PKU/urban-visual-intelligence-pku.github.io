---
title:
  en: A Method of Efficient Synthesizing Post-disaster Remote Sensing Image with Diffusion Model and LLM
theme: foundation
type: paper
year: 2023
date: 2023-10
venue: APSIPA ASC 2023
authors: Ruizhe Ou, Haotian Yan, Ming Wu, Chuang Zhang
members: [ruizhe-ou]
summary:
  en: >-
    A pipeline that generates disaster-affected remote sensing images from only 97 unlabelled 512×512 images.
    BLIP produces initial captions, which are refined with expert feedback and GPT-4 rewriting, and the
    resulting image–prompt pairs are used to fine-tune Stable Diffusion.
  zh: >-
    仅用 97 张未标注的 512×512 遥感影像生成灾后影像的方法：先用 BLIP 生成初始描述，经专家反馈与 GPT-4 改写增强提示词，
    再用得到的图文对微调 Stable Diffusion。
cover: ./cover.png
links:
  paper: https://ieeexplore.ieee.org/document/10317383
---
